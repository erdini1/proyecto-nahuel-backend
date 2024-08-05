import { CashRegister, Cancellation } from '../models/index.model.js'

const create = async (cancellationData) => {
	const cancellation = await Cancellation.create(cancellationData)
	return cancellation?.dataValues
}

const getAll = async () => {
	const cancellations = await Cancellation.findAll({
		include: [
			{
				model: CashRegister,
				required: true,
				attributes: {
					exclude: ['updatedAt', "createdAt"]
				}
			}
		],
		attributes: {
			exclude: ['updatedAt', "createdAt", 'cashRegisterId']
		},
		order: [["id", "DESC"]]
	})
	return cancellations
}

const getById = async (cancellationId) => {
	const cancellation = await Cancellation.findByPk(cancellationId, {
		include: [
			{
				model: CashRegister,
				required: true,
				attributes: {
					exclude: ['updatedAt', "createdAt"]
				}
			}
		],
		attributes: {
			exclude: ['updatedAt', "createdAt", 'cashRegisterId']
		}
	})
	return cancellation
}

const getByCashRegisterId = async (cashRegisterId) => {
	const cancellations = await Cancellation.findAll({
		where: {
			cashRegisterId
		},
		include: [
			{
				model: CashRegister,
				required: true,
				attributes: {
					exclude: ['updatedAt', "createdAt"]
				}
			}
		],
		attributes: {
			exclude: ['updatedAt', "createdAt", 'cashRegisterId']
		}
	})
	return cancellations
}

const deleteById = async (cancellationId) => {
	const cancellation = await Cancellation.findByPk(cancellationId)
	await cancellation.destroy()
}

const save = async (cancellation) => {
	await cancellation.save()
}

export const cancellationRepository = {
	create,
	save,
	getAll,
	getById,
	getByCashRegisterId,
	deleteById
}