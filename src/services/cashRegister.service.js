import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { cashRegisterRepository } from "../repositories/cashRegister.repository.js"
import { userRepository } from "../repositories/user.repository.js";

const create = async (userId, cashRegisterData) => {
	try {
		const {
			cashRegisterNumber,
			initialAmount,
			changeAmount,
			/* salesWithCash,
			salesWithCards,
			salesWithCredit,
			salesWithMercadoPago,
			salesWithPointMaxiconsumo,
			cashToRenderWithCash,
			cashToRenderWithCards,
			cashToRenderWithCredit,
			cashToRenderWithMercadoPago,
			cashToRenderWithPointMaxiconsumo, */
		} = cashRegisterData
		const user = await userRepository.getById(userId)
		if (!user) throw new ApiError("El usuario no existe", HTTP_STATUSES.NOT_FOUND)

		return await cashRegisterRepository.create({
			cashRegisterNumber,
			initialAmount,
			changeAmount,
			/* salesWithCash,
			salesWithCards,
			salesWithCredit,
			salesWithMercadoPago,
			salesWithPointMaxiconsumo, */
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
		const {
			cashRegisterNumber,
			initialAmount,
			changeAmount,
			// totalCashInSystem,
			// totalCashOnHand,
			salesWithCash,
			salesWithCards,
			salesWithCredit,
			salesWithMercadoPago,
			salesWithPointMaxiconsumo,
			cashToRenderWithCash,
			cashToRenderWithCards,
			cashToRenderWithCredit,
			cashToRenderWithMercadoPago,
			cashToRenderWithPointMaxiconsumo,
		} = cashRegisterData;

		const cashRegister = await cashRegisterRepository.getById(cashRegisterId);
		if (!cashRegister) throw new ApiError("El registro de caja no existe", HTTP_STATUSES.NOT_FOUND);

		cashRegister.cashRegisterNumber = cashRegisterNumber || cashRegister.cashRegisterNumber;
		cashRegister.initialAmount = initialAmount || cashRegister.initialAmount;
		cashRegister.changeAmount = changeAmount || cashRegister.changeAmount;
		// cashRegister.totalCashInSystem = totalCashInSystem || cashRegister.totalCashInSystem;
		// cashRegister.totalCashOnHand = totalCashOnHand || cashRegister.totalCashOnHand;
		cashRegister.salesWithCash = salesWithCash || cashRegister.salesWithCash;
		cashRegister.salesWithCards = salesWithCards || cashRegister.salesWithCards;
		cashRegister.salesWithCredit = salesWithCredit || cashRegister.salesWithCredit;
		cashRegister.salesWithMercadoPago = salesWithMercadoPago || cashRegister.salesWithMercadoPago;
		cashRegister.salesWithPointMaxiconsumo = salesWithPointMaxiconsumo || cashRegister.salesWithPointMaxiconsumo;
		cashRegister.cashToRenderWithCash = cashToRenderWithCash || cashRegister.cashToRenderWithCash;
		cashRegister.cashToRenderWithCards = cashToRenderWithCards || cashRegister.cashToRenderWithCards;
		cashRegister.cashToRenderWithCredit = cashToRenderWithCredit || cashRegister.cashToRenderWithCredit;
		cashRegister.cashToRenderWithMercadoPago = cashToRenderWithMercadoPago || cashRegister.cashToRenderWithMercadoPago;
		cashRegister.cashToRenderWithPointMaxiconsumo = cashToRenderWithPointMaxiconsumo || cashRegister.cashToRenderWithPointMaxiconsumo;

		await cashRegisterRepository.save(cashRegister);
		return cashRegister;
	} catch (error) {
		throw error
	}
}

const checkIfCashRegisterExists = async (userId) => {
	try {
		const date = new Date();
		const cashRegister = await cashRegisterRepository.getByUserIdAndDate(userId, date);
		if (!cashRegister) return false;
		return true;
	} catch (error) {
		throw error
	}
}

const getByUserId = async (userId) => {
	try {
		const cashRegister = await cashRegisterRepository.getByUserId(userId);
		if (!cashRegister) throw new ApiError("El registro de caja no existe", HTTP_STATUSES.NOT_FOUND);

		return cashRegister;
	} catch (error) {
		throw error
	}
}

export const cashRegisterService = {
	create,
	getAll,
	getById,
	update,
	checkIfCashRegisterExists,
	getByUserId
};