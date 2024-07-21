import { CashBox } from '../models/index.model.js'

const create = async (cashBoxData) => {
	const cashBox = await CashBox.create(cashBoxData)
	return cashBox?.dataValues
}

const getAll = async () => {
	const cashBoxs = await CashBox.findAll()
	return cashBoxs
}

const getById = async (cashBoxId) => {
	const cashBox = await CashBox.findByPk(cashBoxId)
	return cashBox
}

const save = async (cashBox) => {
	await cashBox.save()
}

export const cashBoxRepository = {
	create,
	save,
	getAll,
	getById,
}