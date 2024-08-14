import { Op, where } from 'sequelize'
import { Task, User, UserTask, TaskSet, Sector } from '../models/index.model.js'

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

const getByIds = async (userTaskIds) => {
	const userTasks = await UserTask.findAll({
		where: {
			id: userTaskIds
		}
	})
	return userTasks
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
				attributes: ['id', 'description', "type"],
				include: {
					model: Sector
				}
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
		order: [['order', 'ASC']]
	})
	return userTasks
}

const getAllByTaskSetNotClosed = async () => {
	const userTasks = await UserTask.findAll({
		include: [
			{
				model: Task,
				required: true,
				attributes: ['id', 'description', "type"],
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
				attributes: ['id', 'description', "type"],
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
				attributes: ['id', 'description', "type"],
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
const getByTaskSetId = async (taskSetId) => {
	const userTasks = await UserTask.findAll({
		where: {
			taskSetId
		},
		include: [
			{
				model: Task,
				required: true,
				attributes: ['id', 'description', "type"],
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

const updateTaskOrder = async (userTasksToUpdate, taskIdToOrderMap) => {
	try {
		const promises = userTasksToUpdate.map(async (userTask) => {
			return await UserTask.update(
				{ order: taskIdToOrderMap[userTask.id] },
				{ where: { id: userTask.id } }
			);
		});

		await Promise.all(promises);

	} catch (error) {
		throw new Error("Error al actualizar múltiples registros: " + error.message);
	}
};

const updateMany = async (userTasks) => {
	try {
		const promises = userTasks.map(async (userTask) => {
			return await UserTask.update(
				{ isActive: userTask.isActive },
				{ where: { id: userTask.id } }
			);
		});
		await Promise.all(promises);
	} catch (error) {
		throw new Error("Error al actualizar múltiples registros: " + error.message);
	}
};

export const userTaskRepository = {
	createMany,
	getLatestByUserIdAndTaskId,
	getById,
	getByIds,
	getAll,
	getByUserId,
	getByUserIdAndTaskSet,
	getAllByTaskSetNotClosed,
	getByDate,
	getByRangeOfDates,
	getByTaskSetId,
	getByTaskId,
	save,
	updateTaskOrder,
	updateMany,
}