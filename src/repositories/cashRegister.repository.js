import { CashBox, CashRegister, User } from '../models/index.model.js'

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
				attributes: ['id', 'firstName', 'lastName']
			},
			{
				model: CashBox,
				required: true,
				attributes: ['id', 'description', 'hasCheckingAccount']
			}
		],
		attributes: {
			exclude: ['updatedAt', "createdAt", 'userId', 'cashBoxId']
		},
		order: [['date', 'DESC']]
	})
	return cashRegisters
}

const getById = async (cashRegisterId) => {
	const cashRegister = await CashRegister.findByPk(cashRegisterId, {
		include: [
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName']
			},
			{
				model: CashBox,
				required: true,
				attributes: ['id', 'description', 'hasCheckingAccount']
			}
		],
		attributes: {
			exclude: ['updatedAt', "createdAt", 'userId', 'cashBoxId']
		}
	})
	return cashRegister
}

const getLastByUserId = async (userId) => {
	const cashRegister = await CashRegister.findOne({
		where: {
			userId,
			isClosed: false
		},
		order: [['id', 'DESC']],
		include: [
			{
				model: CashBox,
				required: true,
				attributes: ['id', 'description', 'hasCheckingAccount']
			}
		],
	})
	return cashRegister
}

// const getByUserId = async (userId) => {
// 	const cashRegister = await CashRegister.findOne({
// 		where: { userId },
// 		order: [['id', 'DESC']]
// 	});
// 	return cashRegister
// }

const save = async (cashRegister) => {
	await cashRegister.save()
}

export const cashRegisterRepository = {
	create,
	save,
	getAll,
	getById,
	getLastByUserId,
}