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
		order: [
			['description', 'ASC']
		],
	})
	return terminals
}

const getById = async (terminalId) => {
	const terminal = await Terminal.findByPk(terminalId)
	return terminal
}

const getByDescription = async (description) => {
	const terminal = await Terminal.findOne({
		where: {
			description
		}
	})
	return terminal
}

const getByCashRegisterId = async (cashRegisterId) => {
	const terminals = await Terminal.findAll({
		include: [
			{
				model: CashRegister,
				where: {
					id: cashRegisterId
				},
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

const save = async (terminal) => {
	await terminal.save()
}

export const terminalRepository = {
	create,
	bulkCreate,
	getAll,
	getById,
	getByDescription,
	getByCashRegisterId,
	save,
}