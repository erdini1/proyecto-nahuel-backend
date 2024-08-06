import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { terminalRepository } from "../repositories/terminal.repository.js";

const create = async (terminalData) => {
	try {
		const { terminalNumber, description } = terminalData

		return await terminalRepository.create({
			terminalNumber,
			description,
		})
	} catch (error) {
		throw error
	}
}

const bulkCreate = async (terminalsData) => {
	try {
		return await terminalRepository.bulkCreate(terminalsData);
	} catch (error) {
		throw error;
	}
};

const getAll = async () => {
	try {
		return await terminalRepository.getAll();
	} catch (error) {
		throw error
	}
};

const getById = async (terminalId) => {
	try {
		const terminal = await terminalRepository.getById(terminalId);
		if (!terminal) throw new ApiError("La terminal no existe", HTTP_STATUSES.NOT_FOUND);

		return terminal;
	} catch (error) {
		throw error
	}
}

const update = async (terminalId, terminalData) => {
	try {
		const { terminalNumber, description } = terminalData;

		const terminal = await terminalRepository.getById(terminalId);
		if (!terminal) throw new ApiError("La terminal no existe", HTTP_STATUSES.NOT_FOUND);

		terminal.terminalNumber = terminalNumber || terminal.terminalNumber;
		terminal.description = description || terminal.description;

		await terminalRepository.save(terminal);
		return terminal;
	} catch (error) {
		throw error
	}
}

const getByCashRegisterId = async (cashRegisterId) => {
	try {
		return await terminalRepository.getByCashRegisterId(cashRegisterId);
	} catch (error) {
		throw error
	}
}

const deleteTerminal = async (terminalId) => {
	try {
		const terminal = await terminalRepository.getById(terminalId);
		if (!terminal) throw new ApiError("La terminal no existe", HTTP_STATUSES.NOT_FOUND);

		terminal.isActive = false;
		await terminalRepository.save(terminal);
	} catch (error) {
		throw error
	}
}


export const terminalService = {
	create,
	bulkCreate,
	getAll,
	getById,
	update,
	getByCashRegisterId,
	deleteTerminal
};