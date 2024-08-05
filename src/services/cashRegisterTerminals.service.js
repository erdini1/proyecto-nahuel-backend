import { cashRegisterTerminalsRepository } from "../repositories/cashRegisterTerminals.repository.js";

const createAssociation = async (cashRegisterData) => {
	try {
		const { cashRegisterId, terminalId } = cashRegisterData
		return await cashRegisterTerminalsRepository.createAssociation(cashRegisterId, terminalId);
	} catch (error) {
		throw error;
	}
}

const getAll = async () => {
	try {
		return await cashRegisterTerminalsRepository.getAll();
	} catch (error) {
		throw error;
	}
}

const deleteAssociation = async (cashRegisterData) => {
	try {
		const { cashRegisterId, terminalId } = cashRegisterData
		return await cashRegisterTerminalsRepository.deleteAssociation(cashRegisterId, terminalId);
	} catch (error) {
		throw error;
	}
}

export const cashRegisterTerminalsService = {
	createAssociation,
	getAll,
	deleteAssociation,
};
