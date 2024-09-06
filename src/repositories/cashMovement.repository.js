import { Op } from 'sequelize'
import sequelize from '../config/db.config.js'
import { CashRegister, Provider, CashMovement, User, CashBox } from '../models/index.model.js'

const create = async (cashMovementData) => {
	const cashMovement = await CashMovement.create(cashMovementData)
	return cashMovement?.dataValues
}

const getAll = async () => {
	const cashMovements = await CashMovement.findAll({
		include: [
			{
				model: CashRegister,
				required: true,
				attributes: {
					exclude: ['updatedAt', "createdAt"]
				},
			},
			{
				model: Provider,
				required: true,
				attributes: ['id', 'name']
			}
		],
		attributes: {
			exclude: ['updatedAt', 'cashRegisterId', 'providerId']
		},
		order: [["id", "DESC"]]
	})
	return cashMovements
}

const getAllWithdrawals = async (page = 1, itemsPerPage = 10, filters = {}) => {
	const offset = (page - 1) * itemsPerPage;
	const { providerName, cashBoxIdsArray, dateFrom, dateTo } = filters;

	const cashMovements = await CashMovement.findAndCountAll({
		limit: itemsPerPage,
		offset: offset,
		where: {
			...(dateFrom && dateTo && dateFrom !== '' && dateTo !== '' && {
				'$CashRegister.date$': {
					[Op.between]: [new Date(dateFrom), new Date(dateTo)]
				}
			})
		},
		include: [
			{
				model: CashRegister,
				required: true,
				attributes: ['date'],
				include: [
					{
						model: User,
						required: true,
						attributes: ['firstName', 'lastName']
					},
					{
						model: CashBox,
						required: true,
						attributes: ['id', 'description'],
						where: {
							...(Array.isArray(cashBoxIdsArray) && cashBoxIdsArray.length > 0 && {
								id: { [Op.in]: cashBoxIdsArray }
							})
						}
					}
				]
			},
			{
				model: Provider,
				required: true,
				attributes: ['name'],
				where: {
					...(providerName && providerName.trim() !== '' && {
						name: { [Op.like]: `%${providerName}%` }
					})
				}
			}
		],
		attributes: {
			exclude: ['type', 'updatedAt', 'cashRegisterId', 'providerId']
		},
		order: [["id", "DESC"]]
	});

	return cashMovements;
};

const getWithdrawalsSummary = async (filters = {}) => {
	const { providerName, cashBoxIdsArray, dateFrom, dateTo } = filters;

	const total = await CashMovement.findOne({
		attributes: [
			[sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
		],
		where: {
			...(dateFrom && dateTo && dateFrom !== '' && dateTo !== '' && {
				'$CashRegister.date$': {
					[Op.between]: [new Date(dateFrom), new Date(dateTo)]
				}
			})
		},
		include: [
			{
				model: CashRegister,
				required: true,
				attributes: [],
				include: [
					{
						model: User,
						required: true,
						attributes: []
					},
					{
						model: CashBox,
						required: true,
						attributes: [],
						where: {
							...(Array.isArray(cashBoxIdsArray) && cashBoxIdsArray.length > 0 && {
								id: { [Op.in]: cashBoxIdsArray }
							})
						}
					}
				]
			},
			{
				model: Provider,
				required: true,
				attributes: [],
				where: {
					...(providerName && providerName.trim() !== '' && {
						name: { [Op.like]: `%${providerName}%` }
					})
				}
			}
		],
		raw: true
	});

	return total.totalAmount || 0;
}

const getById = async (cashMovementId) => {
	const cashMovement = await CashMovement.findByPk(cashMovementId, {
		include: [
			{
				model: CashRegister,
				required: true,
				attributes: {
					exclude: ['updatedAt', "createdAt"]
				}
			},
			{
				model: Provider,
				required: true,
				attributes: ['id', 'name']
			}
		],
		attributes: {
			exclude: ['updatedAt', 'cashRegisterId', 'providerId']
		}
	})
	return cashMovement
}

const getByCashRegisterId = async (cashRegisterId) => {
	const cashMovements = await CashMovement.findAll({
		where: { cashRegisterId },
		include: [
			{
				model: CashRegister,
				required: true,
				attributes: {
					exclude: ['updatedAt', "createdAt"]
				}
			},
			{
				model: Provider,
				required: true,
				attributes: ['id', 'name']
			}
		],
		attributes: {
			exclude: ['updatedAt', 'providerId']
		}
	})
	return cashMovements
}

const deleteById = async (cashMovementId) => {
	const cashMovement = await CashMovement.findByPk(cashMovementId)
	await cashMovement.destroy()
}

const save = async (cashMovement) => {
	await cashMovement.save()
}

export const cashMovementRepository = {
	create,
	save,
	getAll,
	getAllWithdrawals,
	getWithdrawalsSummary,
	getById,
	getByCashRegisterId,
	deleteById
}