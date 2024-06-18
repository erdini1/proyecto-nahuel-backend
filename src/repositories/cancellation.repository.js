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
				attributes: [
					"id",
					"cashRegisterNumber",
					"initialAmount",
					"changeAmount",
					"totalCashInSystem",
					"totalCashOnHand",
					"difference",
				] // TODO: revisar los campos que quiero mostrar
			}
		],
		attributes: {
			exclude: ['updatedAt', "createdAt", 'cashRegisterId']
		}
	})
	return cancellations
}

const getById = async (cancellationId) => {
	const cancellation = await Cancellation.findByPk(cancellationId, {
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
				] // TODO: revisar los campos que quiero mostrar
			}
		],
		attributes: {
			exclude: ['updatedAt', "createdAt", 'cashRegisterId']
		}
	})
	return cancellation
}

const save = async (cancellation) => {
	await cancellation.save()
}

export const cancellationRepository = {
	create,
	save,
	getAll,
	getById,
}