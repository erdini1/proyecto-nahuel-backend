import { CashRegister, Provider, CashMovement } from '../models/index.model.js'

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
				attributes: [
					"id",
					"cashRegisterNumber",
					"initialAmount",
					"changeAmount",
					"totalCashInSystem",
					"totalCashOnHand",
					"difference",
				],
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
	return cashMovements
}

const getById = async (cashMovementId) => {
	const cashMovement = await CashMovement.findByPk(cashMovementId, {
		include: [
			{
				model: CashRegister,
				required: true,
				attributes: [
					"id",
					"cashRegisterNumber",
					"initialAmount",
					"changeAmount",
					"totalCashInSystem",
					"totalCashOnHand",
					"difference",
				],
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
				attributes: [
					"id",
					"cashRegisterNumber",
					"initialAmount",
					"changeAmount",
					"totalCashInSystem",
					"totalCashOnHand",
					"difference",
				],
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
	getById,
	getByCashRegisterId,
	deleteById
}