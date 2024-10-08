import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { taskRepository } from "../repositories/task.repository.js";
import { taskSetRepository } from "../repositories/taskSet.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { userTaskService } from "./userTask.service.js";

const create = async (taskData) => {
	try {
		const { description, sector, type } = taskData;

		const task = await taskRepository.getByDescription(description);
		if (task !== null) throw new ApiError("La tarea ya se encuentra registrada", HTTP_STATUSES.BAD_REQUEST)
		const newTask = await taskRepository.create({
			description,
			sectorId: sector,
			type,
		});

		const users = await userRepository.getAll();
		const usersWithSector = users.filter(user => user.Sectors.find(userSector => userSector.id === sector));

		const userTasks = usersWithSector.map(user => {
			return {
				userId: user.id,
				taskId: newTask.id,
				isCompleted: false,
			};
		})
		await userTaskService.createForManyUsers(userTasks);

		return newTask;
	} catch (error) {
		throw error
	}
};

const bulkCreate = async (tasksData) => {
	try {
		return await taskRepository.bulkCreate(tasksData);
	} catch (error) {
		throw error;
	}
}

const getAll = async () => {
	try {
		return await taskRepository.getAll();
	} catch (error) {
		throw error
	}
};

const update = async (taskId, taskData) => {
	try {
		const { description, sector, type } = taskData;

		const task = await taskRepository.getById(taskId);
		if (!task) throw new ApiError("La tarea no existe", HTTP_STATUSES.NOT_FOUND);

		task.description = description || task.description;
		task.type = type || task.type;

		if (sector && sector !== task.sectorId) {
			const users = await userRepository.getAll();
			const usersWithSector = users.filter(user => user.Sectors.find(userSector => userSector.id === sector));
			const usersWithPreviousSector = users.filter(user => user.Sectors.find(userSector => userSector.id === task.sectorId));

			const userTasksToDelete = await Promise.all(usersWithPreviousSector.map(async user => {
				return userTaskService.getUserTaskByUserIdAndTaskId(user.id, task.id);
			}));
			await userTaskService.removeManyByUserTaskId(userTasksToDelete.map(userTask => !userTask ? null : userTask.id));

			const userTasks = usersWithSector.map(user => {
				return {
					userId: user.id,
					taskId: task.id,
					isCompleted: false,
				};
			})
			await userTaskService.createForManyUsers(userTasks);

		}
		task.sectorId = sector || task.sectorId;

		await taskRepository.save(task);
		return task;
	} catch (error) {
		throw error
	}
};

const getById = async (taskId) => {
	try {
		const task = await taskRepository.getById(taskId);
		if (!task) throw new ApiError("La tarea no existe", HTTP_STATUSES.NOT_FOUND);

		return task;
	} catch (error) {
		throw error
	}
}

const deleteTask = async (taskId) => {
	try {
		const task = await taskRepository.getById(taskId);
		if (!task) throw new ApiError("La tarea no existe", HTTP_STATUSES.NOT_FOUND);

		await taskRepository.deleteTask(taskId);
	} catch (error) {
		throw error
	}
}

const deleteTasks = async (taskIds) => {
	try {
		await taskRepository.deleteTasks(taskIds);
	} catch (error) {
		throw error
	}
}

export const taskService = {
	create,
	bulkCreate,
	getAll,
	update,
	getById,
	deleteTask,
	deleteTasks,
};