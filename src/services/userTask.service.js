import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { taskSetRepository } from "../repositories/taskSet.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { userTaskRepository } from "../repositories/userTask.respository.js"

// REVISADO
const create = async (userTaskData) => {
	try {
		const { userId, taskIds } = userTaskData
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
			taskSetId: taskSet.id
		}))
		return await userTaskRepository.createMany(checklistItems)
	} catch (error) {
		throw error
	}
}

// REVISADO
const markTaskAsCompleted = async (userId, taskId) => {
	try {
		const taskSet = await taskSetRepository.getLastestById(userId)

		const userTask = await userTaskRepository.getLatestByUserIdAndTaskId(userId, taskId, taskSet.id)
		if (!userTask) throw new ApiError("La tarea no existe o no esta asignada a este usuario", HTTP_STATUSES.NOT_FOUND)

		userTask.isCompleted = !userTask.isCompleted
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
		// if (!taskSet) throw new ApiError("No se encontro un conjuto de tareas", HTTP_STATUSES.NOT_FOUND)
		let userTasks
		if (taskSet) {
			userTasks = await userTaskRepository.getByUserIdAndTaskSet(userId, taskSet.id)
		}
		// const userTasks = await userTaskRepository.getByUserIdAndTaskSet(userId, taskSet.id)
		return userTasks || []
	} catch (error) {
		throw error
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
const getByUserIdDateAndShift = async (userId, date, shift) => {
	try {
		console.log(userId, date, shift)
		const userTasks = await userTaskRepository.getByUserIdDateAndShift(userId, date, shift)
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
const deleteUserTask = async (userTaskId) => {
	try {
		const userTask = await userTaskRepository.getById(userTaskId)
		if (!userTask) throw new ApiError("La user task no existe", HTTP_STATUSES.NOT_FOUND)

		userTask.isActive = false
		await userTaskRepository.save(userTask)
	} catch (error) {
		throw error
	}
}


export const userTaskService = {
	create,
	markTaskAsCompleted,
	getAll,
	getByUserId,
	getByUserIdAndTaskSet,
	getByDate,
	getAllByTaskSetNotClosed,
	getMyLastTasks,
	getByRangeOfDates,
	getByUserIdDateAndShift,
	getByTaskId,
	deleteUserTask,
}


