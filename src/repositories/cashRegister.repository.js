import { CashRegister, User } from '../models/index.model.js'

const create = async (cashRegisterData) => {
	const cashRegister = await CashRegister.create(cashRegisterData)
	return cashRegister?.dataValues
}

const getAll = async () => {
	const cashRegisters = await CashRegister.findAll({
		include: [
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName'] // TODO: revisar los campos que quiero mostrar
			}
		],
		attributes: {
			exclude: ['updatedAt', "createdAt", 'userId']
		}
	})
	return cashRegisters
}

const getById = async (cashRegisterId) => {
	const cashRegister = await CashRegister.findByPk(cashRegisterId, {
		include: [
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName'] // TODO: revisar los campos que quiero mostrar
			}
		],
		attributes: {
			exclude: ['updatedAt', "createdAt", 'userId']
		}
	})
	return cashRegister
}

const getByUserIdAndDate = async (userId, date) => {
	const cashRegister = await CashRegister.findOne({
		where: {
			userId,
			date: date
		}
	})
	return cashRegister
}

const getByUserId = async (userId) => {
	const cashRegister = await CashRegister.findOne({
		where: { userId },
		order: [['date', 'DESC']]
	});
	return cashRegister
}

const save = async (cashRegister) => {
	await cashRegister.save()
}

export const cashRegisterRepository = {
	create,
	save,
	getAll,
	getById,
	getByUserIdAndDate,
	getByUserId
}