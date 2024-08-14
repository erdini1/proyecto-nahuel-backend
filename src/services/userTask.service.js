import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { taskSetRepository } from "../repositories/taskSet.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { userTaskRepository } from "../repositories/userTask.respository.js"

// REVISADO
const create = async (userTaskData) => {
	try {
		const { userId, taskIds, periodicity } = userTaskData
		const user = await userRepository.getById(userId)
		if (!user) throw new ApiError("El usuario no existe", HTTP_STATUSES.NOT_FOUND)

		let taskSet = await taskSetRepository.getLastestById(userId)
		if (!taskSet || taskSet.isClosed) {
			taskSet = await taskSetRepository.create({ userId, shift: "" })
		}

		const checklistItems = taskIds.map(taskId => ({
			taskId,
			isCompleted: false,
			userId,
			periodicity: periodicity || "recurring",
			taskSetId: taskSet.id
		}))
		return await userTaskRepository.createMany(checklistItems)
	} catch (error) {
		throw error
	}
}

const createForManyUsers = async (userTaskData) => {
	try {
		const userIds = userTaskData.map(item => item.userId);

		const newUserTasksPromises = userIds.map(async userId => {
			let taskSet = await taskSetRepository.getLastestById(userId);

			if (!taskSet || taskSet.isClosed) {
				taskSet = await taskSetRepository.create({ userId, shift: "" });
			}

			return userTaskData
				.filter(item => item.userId === userId)
				.map(item => ({
					taskId: item.taskId,
					isCompleted: false,
					userId: item.userId,
					periodicity: "recurring",
					taskSetId: taskSet.id
				}));
		});

		const newUserTasks = await Promise.all(newUserTasksPromises);

		const flattenedNewUserTasks = newUserTasks.flat();

		return await userTaskRepository.createMany(flattenedNewUserTasks);
	} catch (error) {
		throw error;
	}
};

// REVISADO
const markTaskAsCompleted = async (userId, taskId, body) => {
	try {
		const { kilos } = body
		const taskSet = await taskSetRepository.getLastestById(userId)

		const userTask = await userTaskRepository.getLatestByUserIdAndTaskId(userId, taskId, taskSet.id)
		if (!userTask) throw new ApiError("La tarea no existe o no esta asignada a este usuario", HTTP_STATUSES.NOT_FOUND)

		userTask.isCompleted = !userTask.isCompleted
		userTask.kilos = kilos || userTask.kilos

		await userTaskRepository.save(userTask)
		return userTask
	} catch (error) {
		throw error
	}
}

// NO REVISADO
const getAll = async () => {
	try {
		const userTasks = await userTaskRepository.getAll()
		return userTasks
	} catch (error) {
		throw error
	}
}

// NO REVISADO
const getByUserId = async (userId) => {
	try {
		const user = await userRepository.getById(userId)
		if (!user) throw new ApiError("El usuario no existe", HTTP_STATUSES.NOT_FOUND)

		const tasks = user.Tasks.map(task => ({
			taskId: task.id,
			description: task.description,
			isCompleted: task.UserTask.isCompleted,
			shift: task.UserTask.shift,
			createdAt: task.UserTask.createdAt
		}))

		return { userId: user.id, tasks }
	} catch (error) {
		throw error
	}
}

// REVISADO
const getByUserIdAndTaskSet = async (userId) => {
	try {
		const taskSet = await taskSetRepository.getLastestById(userId)
		let userTasks
		if (taskSet) {
			userTasks = await userTaskRepository.getByUserIdAndTaskSet(userId, taskSet.id)
		}
		return userTasks || []
	} catch (error) {
		throw error
	}
}

const getUserTaskByUserIdAndTaskId = async (userId, taskId) => {
	try {
		const taskSet = await taskSetRepository.getLastestById(userId);
		const userTask = await userTaskRepository.getLatestByUserIdAndTaskId(userId, taskId, taskSet.id);
		return userTask;
	} catch (error) {
		throw error;
	}
}

// NO REVISADO
const getByDate = async (date) => {
	try {
		const userTasks = await userTaskRepository.getByDate(date)
		return userTasks
	} catch (error) {
		throw error
	}
}

// REVISADO
const getAllByTaskSetNotClosed = async () => {
	try {
		const taskSets = await taskSetRepository.getAllTaskSetsNotClosed()
		const userTasks = await userTaskRepository.getAllByTaskSetNotClosed(taskSets.map(taskSet => taskSet.id))
		return userTasks
	} catch (error) {
		throw error
	}
}

// NO REVISADO
const getMyLastTasks = async (userId) => {
	try {
		const date = new Date().toISOString().split('T')[0]
		const userTasks = await userTaskRepository.getByUserIdAndDate(userId, date)
		return userTasks
	} catch (error) {
		throw error
	}
}

// NO REVISADO
const getByRangeOfDates = async (userId, startDate, endDate) => {
	try {
		const userTasks = await userTaskRepository.getByRangeOfDates(userId, startDate, endDate)
		return userTasks
	} catch (error) {
		throw error
	}
}

// REVISADO
const getByTaskSetId = async (taskSetId) => {
	try {
		const userTasks = await userTaskRepository.getByTaskSetId(taskSetId)
		return userTasks
	} catch (error) {
		throw error
	}
}

// NO REVISADO
const getByTaskId = async (taskId) => {
	try {
		const userTasks = await userTaskRepository.getByTaskId(taskId)
		return userTasks
	} catch (error) {
		throw error
	}
}

// REVISADO
const disableUserTask = async (userTaskId, isActive) => {
	try {
		const userTask = await userTaskRepository.getById(userTaskId)
		if (!userTask) throw new ApiError("La user task no existe", HTTP_STATUSES.NOT_FOUND)

		userTask.isActive = isActive || false
		await userTaskRepository.save(userTask)
	} catch (error) {
		throw error
	}
}

const updateTaskOrder = async (taskIdsInOrder, userId) => {
	try {
		const taskSet = await taskSetRepository.getLastestById(userId);
		const currentUserTasks = await userTaskRepository.getByUserIdAndTaskSet(userId, taskSet.id);

		const taskIdToOrderMap = taskIdsInOrder.reduce((map, id, index) => {
			map[id] = index;
			return map;
		}, {});

		const userTasksToUpdate = currentUserTasks.filter(userTask => {
			return userTask.order !== taskIdToOrderMap[userTask.id];
		});

		if (userTasksToUpdate.length > 0) {
			await userTaskRepository.updateTaskOrder(userTasksToUpdate, taskIdToOrderMap);
		}

	} catch (error) {
		throw error;
	}
};

const removeManyByUserTaskId = async (userTaskIds) => {
	try {
		const userTasks = await userTaskRepository.getByIds(userTaskIds);
		userTasks.forEach(userTask => {
			userTask.isActive = false;
		});
		await userTaskRepository.updateMany(userTasks);
	} catch (error) {
		throw error;
	}
};

export const userTaskService = {
	create,
	createForManyUsers,
	markTaskAsCompleted,
	getAll,
	getByUserId,
	getUserTaskByUserIdAndTaskId,
	getByUserIdAndTaskSet,
	getByDate,
	getAllByTaskSetNotClosed,
	getMyLastTasks,
	getByRangeOfDates,
	getByTaskSetId,
	getByTaskId,
	disableUserTask,
	updateTaskOrder,
	removeManyByUserTaskId
}


