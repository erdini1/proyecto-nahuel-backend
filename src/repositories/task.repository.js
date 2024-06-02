import Task from '../models/task.model.js'

const create = async (taskData) => {
	const task = await Task.create(taskData)
	return task?.dataValues
}

const getAll = async () => {
	const tasks = await Task.findAll()
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
	return task
}

const save = async (task) => {
	await task.save()
}

export const taskRepository = {
	create,
	save,
	getAll,
	getById,
	getByDescription
}