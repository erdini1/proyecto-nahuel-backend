import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { taskSetRepository } from "../repositories/taskSet.repository.js";
import { userTaskRepository } from "../repositories/userTask.respository.js";

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

// TODO: Terminar de implementar la opción para agregar tareas a un nuevo conjunto de tareas
const update = async (userId, taskSetData) => {
	try {
		const { shift, observations, isClosed } = taskSetData
		const taskSet = await taskSetRepository.getLastestById(userId)
		if (!taskSet) throw new ApiError("El conjunto de tareas no existe", HTTP_STATUSES.NOT_FOUND)

		taskSet.shift = shift || taskSet.shift
		taskSet.observations = observations || taskSet.observations
		taskSet.isClosed = isClosed || taskSet.isClosed
		// if (isClosed) {
		// 	const lastTaskSet = await taskSetRepository.getLastestById(userId)
		// 	const userTasks = await userTaskRepository.getByUserIdAndTaskSet(userId, lastTaskSet.id)
		// 	const taskSet = await taskSetRepository.create({ userId, shift: "" })

		// 	const checklistItems = userTasks.map(taskId => ({
		// 		taskId,
		// 		isCompleted: false,
		// 		userId,
		// 		taskSetId: taskSet.id
		// 	}))
		// }

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