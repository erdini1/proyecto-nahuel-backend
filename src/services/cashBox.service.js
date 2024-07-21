import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { cashBoxRepository } from "../repositories/cashBox.repository.js";

const create = async (cashBoxData) => {
	try {
		const { description, hasCheckingAccount } = cashBoxData
		return await cashBoxRepository.create({
			description,
			hasCheckingAccount
		})
	} catch (error) {
		throw error
	}
}

const getAll = async () => {
	try {
		return await cashBoxRepository.getAll();
	} catch (error) {
		throw error
	}
};

const getById = async (cashBoxId) => {
	try {
		const cashBox = await cashBoxRepository.getById(cashBoxId);
		if (!cashBox) throw new ApiError("La caja no existe", HTTP_STATUSES.NOT_FOUND);

		return cashBox;
	} catch (error) {
		throw error
	}
}

const update = async (cashBoxId, cashBoxData) => {
	try {
		const { description, hasCheckingAccount } = cashBoxData;

		const cashBox = await cashBoxRepository.getById(cashBoxId);
		if (!cashBox) throw new ApiError("La caja no existe", HTTP_STATUSES.NOT_FOUND);

		cashBox.description = description || cashBox.description;
		cashBox.hasCheckingAccount = hasCheckingAccount || cashBox.hasCheckingAccount;

		await cashBoxRepository.save(cashBox);
		return cashBox;
	} catch (error) {
		throw error
	}
}


export const cashBoxService = {
	create,
	getAll,
	getById,
	update,
};