import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { taskRepository } from "../repositories/task.repository.js";

const create = async (taskData) => {
	try {
		const { description, sector } = taskData;

		const task = await taskRepository.getByDescription(description);
		if (task) throw new ApiError("La tarea ya se encuentra registrada", HTTP_STATUSES.BAD_REQUEST)

		return await taskRepository.create({
			description,
			sector
		});
	} catch (error) {
		throw error
	}
};

const getAll = async () => {
	try {
		return await taskRepository.getAll();
	} catch (error) {
		throw error
	}
};

const update = async (taskId, taskData) => {
	try {
		const { description, sector } = taskData;

		const task = await taskRepository.getById(taskId);
		if (!task) throw new ApiError("La tarea no existe", HTTP_STATUSES.NOT_FOUND);

		task.description = description || task.description;
		task.sector = sector || task.sector;

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

export const taskService = {
	create,
	getAll,
	update,
	getById
};