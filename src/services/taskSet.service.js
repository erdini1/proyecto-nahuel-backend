import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { taskSetRepository } from "../repositories/taskSet.repository.js";

const create = async (taskSetData, userId) => {
	try {
		const { shift } = taskSetData

		return await taskSetRepository.create({
			shift,
			userId
		})
	} catch (error) {
		throw error
	}
}

const getLastestById = async (userId) => {
	try {
		return await taskSetRepository.getLastestById(userId)
	} catch (error) {
		throw error
	}
}

const update = async (userId, taskSetData) => {
	try {
		const { shift, observations, isClosed } = taskSetData
		const taskSet = await taskSetRepository.getLastestById(userId)
		if (!taskSet) throw new ApiError("El conjunto de tareas no existe", HTTP_STATUSES.NOT_FOUND)

		taskSet.shift = shift || taskSet.shift
		taskSet.observations = observations || taskSet.observations
		taskSet.isClosed = isClosed || taskSet.isClosed

		await taskSetRepository.save(taskSet)
	} catch (error) {
		throw error
	}
}

export const taskSetService = {
	create,
	getLastestById,
	update
};