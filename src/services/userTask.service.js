import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { userRepository } from "../repositories/user.repository.js";
import { userTaskRepository } from "../repositories/userTask.respository.js"

// Permite crear un userTask
const create = async (userTaskData) => {
	try {
		const { userId, taskIds, shift } = userTaskData

		const user = await userRepository.getById(userId)
		if (!user) throw new ApiError("El usuario no existe", HTTP_STATUSES.NOT_FOUND)

		const checklistItems = taskIds.map(taskId => ({
			taskId,
			isCompleted: false,
			userId,
			shift
		}))

		return await userTaskRepository.createMany(checklistItems)
	} catch (error) {
		throw error
	}
}

// Permite marcar una tarea como completada 
const markTaskAsCompleted = async (userId, taskId) => {
	try {
		const userTask = await userTaskRepository.getLatestByUserIdAndTaskId(userId, taskId)
		if (!userTask) throw new ApiError("La tarea no existe o no esta asignada a este usuario", HTTP_STATUSES.NOT_FOUND)

		userTask.isCompleted = true
		await userTaskRepository.save(userTask)
		return userTask
	} catch (error) {
		throw error
	}
}

const getAll = async () => {
	try {
		const userTasks = await userTaskRepository.getAll()
		return userTasks
	} catch (error) {
		throw error
	}
}

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

const getByUserIdAndDate = async (userId, date) => {
	try {
		const userTasks = await userTaskRepository.getByUserIdAndDate(userId, date)
		return userTasks
	} catch (error) {
		throw error
	}
}

const getByTaskId = async (taskId) => {
	try {
		const userTasks = await userTaskRepository.getByTaskId(taskId)
		return userTasks
	} catch (error) {
		throw error
	}
}


export const userTaskService = {
	create,
	markTaskAsCompleted,
	getAll,
	getByUserId,
	getByUserIdAndDate,
	getByTaskId,
}


