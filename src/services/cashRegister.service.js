import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { cashRegisterRepository } from "../repositories/cashRegister.repository.js"
import { userRepository } from "../repositories/user.repository.js";

const create = async (userId, cashRegisterData) => {
	try {
		const { cashRegisterNumber, initialAmount, changeAmount/* , userId */ } = cashRegisterData
		const user = await userRepository.getById(userId)
		if (!user) throw new ApiError("El usuario no existe", HTTP_STATUSES.NOT_FOUND)

		return await cashRegisterRepository.create({
			cashRegisterNumber,
			initialAmount,
			changeAmount,
			userId
		})
	} catch (error) {
		throw error
	}
}

const getAll = async () => {
	try {
		return await cashRegisterRepository.getAll();
	} catch (error) {
		throw error
	}
};

const getById = async (cashRegisterId) => {
	try {
		const cashRegister = await cashRegisterRepository.getById(cashRegisterId);
		if (!cashRegister) throw new ApiError("El registro de caja no existe", HTTP_STATUSES.NOT_FOUND);

		return cashRegister;
	} catch (error) {
		throw error
	}
}

const update = async (cashRegisterId, cashRegisterData) => {
	try {
		const { cashRegisterNumber, initialAmount, changeAmount, totalCashInSystem, totalCashOnHand, difference } = cashRegisterData;

		const cashRegister = await cashRegisterRepository.getById(cashRegisterId);
		if (!cashRegister) throw new ApiError("El registro de caja no existe", HTTP_STATUSES.NOT_FOUND);

		cashRegister.cashRegisterNumber = cashRegisterNumber || cashRegister.cashRegisterNumber;
		cashRegister.initialAmount = initialAmount || cashRegister.initialAmount;
		cashRegister.changeAmount = changeAmount || cashRegister.changeAmount;
		cashRegister.totalCashInSystem = totalCashInSystem || cashRegister.totalCashInSystem;
		cashRegister.totalCashOnHand = totalCashOnHand || cashRegister.totalCashOnHand;
		cashRegister.difference = difference || cashRegister.difference;

		await cashRegisterRepository.save(cashRegister);
		return cashRegister;
	} catch (error) {
		throw error
	}
}

const getByUserIdAndDate = async (userId, date) => {
	try {
		return await cashRegisterRepository.getByUserIdAndDate(userId, date);
	} catch (error) {
		throw error
	}
}

export const cashRegisterService = {
	create,
	getAll,
	getById,
	update,
	getByUserIdAndDate
};