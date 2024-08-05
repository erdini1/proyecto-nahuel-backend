import { CashRegisterTerminals } from '../models/index.model.js'

const createAssociation = async (cashRegisterId, terminalId) => {
	const association = await CashRegisterTerminals.create({ cashRegisterId, terminalId });
	return association;
};

const getAll = async () => {
	const associations = await CashRegisterTerminals.findAll();
	return associations;
}

const deleteAssociation = async (cashRegisterId, terminalId) => {
	const association = await CashRegisterTerminals.destroy({ where: { cashRegisterId, terminalId } });
	return association;
}

export const cashRegisterTerminalsRepository = {
	createAssociation,
	getAll,
	deleteAssociation,
};
