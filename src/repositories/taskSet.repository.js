import { TaskSet } from '../models/index.model.js'

// REVISADO
const create = async (taskSetData) => {
	const taskSet = await TaskSet.create(taskSetData)
	return taskSet
}

// REVISADO
const getLastestById = async (userId) => {
	const task = await TaskSet.findOne({
		where: {
			userId
		},
		order: [['createdAt', 'DESC']]
	})
	return task
}

// REVISADO
const getById = async (taskSetId) => {
	const taskSet = await TaskSet.findByPk(taskSetId)
	return taskSet
}

// 
const getAllTaskSetsNotClosed = async () => {
	const taskSets = await TaskSet.findAll({
		where: {
			isClosed: false
		}
	})
	return taskSets
}

// REVISADO
const save = async (taskSet) => {
	await taskSet.save()
}

export const taskSetRepository = {
	create,
	getLastestById,
	getById,
	getAllTaskSetsNotClosed,
	save
}