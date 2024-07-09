import { Op, where } from 'sequelize'
import { Task, User, UserTask, TaskSet } from '../models/index.model.js'

// REVISADO
const createMany = async (userTasksData) => {
	const userTasks = await UserTask.bulkCreate(userTasksData)
	return userTasks
}

// REVISADO
const getLatestByUserIdAndTaskId = async (userId, taskId, taskSetId) => {
	const user = await UserTask.findOne({
		where: {
			userId,
			taskId,
			taskSetId
		},
		order: [['createdAt', 'DESC']]
	})
	return user
}

// NO REVISADO
const getById = async (userTaskId) => {
	const userTask = await UserTask.findByPk(userTaskId)
	return userTask
}

// NO REVISADO
const getAll = async () => {
	const userTasks = await UserTask.findAll()
	return userTasks
}

// NO REVISADO
const getByUserId = async (userId) => {
	const userTasks = await UserTask.findAll({
		where: {
			userId
		}
	})
	return userTasks
}

// REVISADO
const getByUserIdAndTaskSet = async (userId, taskSetId) => {
	const userTasks = await UserTask.findAll({
		where: {
			userId,
			taskSetId,
		},
		include: [
			{
				model: Task,
				required: true,
				attributes: ['id', 'description'],
			},
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName']
			},
			{
				model: TaskSet,
				required: true,
				attributes: ['id', 'shift', 'observations', 'isClosed'],
				where: {
					isClosed: false,
				}
			}
		],
		attributes: {
			exclude: ['updatedAt', 'taskId', 'userId']
		},
		order: [['createdAt', 'ASC']]
	})
	return userTasks
}

const getAllByTaskSetNotClosed = async () => {
	const userTasks = await UserTask.findAll({
		include: [
			{
				model: Task,
				required: true,
				attributes: ['id', 'description'],
			},
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName']
			},
			{
				model: TaskSet,
				required: true,
				where: {
					isClosed: false
				}
			}
		]
	})
	return userTasks
}

// NO REVISADO
const getByDate = async (date) => {
	const userTasks = await UserTask.findAll({
		where: {
			createdAt: date
		},
		include: [
			{
				model: Task,
				required: true,
				attributes: ['id', 'description'],
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

// REVISADO
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
				attributes: ['id', 'description'],
			},
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName']
			},
			{
				model: TaskSet,
				required: true,
				attributes: ['id', 'shift', 'observations', 'isClosed'],
			}
		],
		attributes: {
			exclude: ['updatedAt', 'taskId', 'userId', 'taskSetId']
		},
		order: [['createdAt', 'ASC']]
	})
	return userTasks
}

// REVISADO
const getByUserIdDateAndShift = async (userId, date, shift) => {
	const userTasks = await UserTask.findAll({
		where: {
			createdAt: date,
			userId
		},
		include: [
			{
				model: Task,
				required: true,
				attributes: ['id', 'description'],
			},
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName']
			},
			{
				model: TaskSet,
				required: true,
				attributes: ['id', 'shift', 'observations', 'isClosed'],
				where: {
					shift
				}
			}
		],
		attributes: {
			exclude: ['updatedAt', 'taskId', 'userId', 'taskSetId']
		},
		order: [['createdAt', 'ASC']]
	})
	return userTasks
}

// NO REVISADO
const getByTaskId = async (taskId) => {
	const userTasks = await UserTask.findAll({
		where: {
			taskId
		}
	})
	return userTasks
}

// REVISADO
const save = async (userTask) => {
	await userTask.save()
}

export const userTaskRepository = {
	createMany,
	getLatestByUserIdAndTaskId,
	getById,
	getAll,
	getByUserId,
	getByUserIdAndTaskSet,
	getAllByTaskSetNotClosed,
	getByDate,
	getByRangeOfDates,
	getByUserIdDateAndShift,
	getByTaskId,
	save,
}