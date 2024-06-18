import { CashRegister, Terminal } from '../models/index.model.js'

const create = async (terminalData) => {
	const terminal = await Terminal.create(terminalData)
	return terminal?.dataValues
}

const getAll = async () => {
	const terminals = await Terminal.findAll({
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
	return terminals
}

const getById = async (terminalId) => {
	const terminal = await Terminal.findByPk(terminalId, {
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
	return terminal
}

const save = async (terminal) => {
	await terminal.save()
}

export const terminalRepository = {
	create,
	save,
	getAll,
	getById,
}