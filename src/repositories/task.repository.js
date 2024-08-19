import { Task, Sector } from '../models/index.model.js'

const create = async (taskData) => {
	const task = await Task.create(taskData)
	return task?.dataValues
}

const bulkCreate = async (tasksData) => {
	const tasks = await Task.bulkCreate(tasksData)
	return tasks
}

const getAll = async () => {
	const tasks = await Task.findAll({
		include: [
			{
				model: Sector,
				required: true,
				attributes: ['id', 'name'],
			},
		],
		attributes: {
			exclude: ['updatedAt', 'createdAt', 'sectorId']
		},
		order: [['description', 'ASC']]
	})
	return tasks
}

const getById = async (taskId) => {
	const task = await Task.findByPk(taskId)
	return task
}

const getByDescription = async (description) => {
	const task = await Task.findOne({
		where: {
			description
		}
	})
	return task || null
}

const save = async (task) => {
	await task.save()
}

const deleteTask = async (taskId) => {
	await Task.destroy({
		where: {
			id: taskId
		}
	})
}

// Eliminar masivamente
const deleteTasks = async (taskIds) => {
	await Task.destroy({
		where: {
			id: taskIds
		}
	})
}

export const taskRepository = {
	create,
	bulkCreate,
	save,
	getAll,
	getById,
	getByDescription,
	deleteTask,
	deleteTasks
}