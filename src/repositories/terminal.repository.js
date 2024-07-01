import { CashRegister, Terminal } from '../models/index.model.js'

const create = async (terminalData) => {
	const terminal = await Terminal.create(terminalData)
	return terminal?.dataValues
}

const bulkCreate = async (terminalsData) => {
	const terminals = await Terminal.bulkCreate(terminalsData);
	return terminals.map(terminal => terminal.dataValues);
};

const getAll = async () => {
	const terminals = await Terminal.findAll({
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
	return terminals
}

const getById = async (terminalId) => {
	const terminal = await Terminal.findByPk(terminalId, {
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
	return terminal
}

const getByCashRegisterId = async (cashRegisterId) => {
	const terminals = await Terminal.findAll({
		where: {
			cashRegisterId
		}
	})
	return terminals
}

const deleteTerminal = async (terminalId) => {
	const terminal = await Terminal.findByPk(terminalId)
	await terminal.destroy()
}

const save = async (terminal) => {
	await terminal.save()
}

export const terminalRepository = {
	create,
	bulkCreate,
	save,
	getAll,
	getById,
	getByCashRegisterId,
	deleteTerminal
}