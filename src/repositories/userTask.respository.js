import { Op } from 'sequelize'
import { Task, User, UserTask } from '../models/index.model.js'

// TODO: Hacer un metodo que permita ver en que checklist se encuentra la tarea
// TODO: Hacer un metodo que permita listar tareas completadas por usuario
// TODO: Hacer un metodo que permita listar tareas completadas por sector
// TODO: Hacer un metodo que permita ver las tareas que no estan en ningun checklist

// Permite asignar masivamente tareas a un usuario
const createMany = async (userTasksData) => {
	const userTasks = await UserTask.bulkCreate(userTasksData)
	return userTasks
}

// Permite obtener un userTask por su id
const getById = async (userTaskId) => {
	const userTask = await UserTask.findByPk(userTaskId)
	return userTask
}

// TODO: esta mal, ver que no se pueda completar una tarea del checklist anterior
const getLatestByUserIdAndTaskId = async (userId, taskId) => {
	const user = await UserTask.findOne({
		where: {
			userId,
			taskId
		},
		order: [['createdAt', 'DESC']]
	})
	return user
}

// Permite obtener todos los userTasks
const getAll = async () => {
	const userTasks = await UserTask.findAll()
	return userTasks
}

// Permite obtener todas las tareas asignadas a un usuario
const getByUserId = async (userId) => {
	const userTasks = await UserTask.findAll({
		where: {
			userId
		}
	})
	return userTasks
}

// Permite obtener todas las tareas asignadas a un usuario en una fecha especifica
const getByUserIdAndDate = async (userId, date) => {
	const userTasks = await UserTask.findAll({
		where: {
			userId,
			createdAt: date
		},
		include: [
			{
				model: Task,
				required: true,
				attributes: ['id', 'description', "sector"],
			},
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName']
			}
		],
		attributes: {
			exclude: ['updatedAt', 'taskId', 'userId']
		}
	})
	return userTasks
}

const getByDate = async (date) => {
	const userTasks = await UserTask.findAll({
		where: {
			createdAt: date
		},
		include: [
			{
				model: Task,
				required: true,
				attributes: ['id', 'description', "sector"],
			},
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName']
			}
		],
		attributes: {
			exclude: ['updatedAt', 'taskId', 'userId']
		}
	})
	return userTasks
}

// Obtener usertasks entre dos fechas
const getByRangeOfDates = async (userId, startDate, endDate) => {
	const userTasks = await UserTask.findAll({
		where: {
			createdAt: {
				[Op.between]: [startDate, endDate]
			},
			userId
		},
		include: [
			{
				model: Task,
				required: true,
				attributes: ['id', 'description', "sector"],
			},
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName']
			}
		],
		attributes: {
			exclude: ['updatedAt', 'taskId', 'userId']
		},
		order: [['createdAt', 'ASC']]
	})
	return userTasks
}

// Permite ver todas las tareas asignadas a un usuario
const getByTaskId = async (taskId) => {
	const userTasks = await UserTask.findAll({
		where: {
			taskId
		}
	})
	return userTasks
}

const deleteUserTask = async (userTaskId) => {
	const userTask = await UserTask.findByPk(userTaskId)
	await userTask.destroy()
}

// Permite guardar un userTask
const save = async (userTask) => {
	await userTask.save()
}

export const userTaskRepository = {
	createMany,
	getById,
	getLatestByUserIdAndTaskId,
	getAll,
	getByUserId,
	getByUserIdAndDate,
	getByTaskId,
	save,
	getByDate,
	deleteUserTask,
	getByRangeOfDates
}