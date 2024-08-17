import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { cashRegisterRepository } from "../repositories/cashRegister.repository.js"
import { cashRegisterTerminalsRepository } from "../repositories/cashRegisterTerminals.repository.js";
import { terminalRepository } from "../repositories/terminal.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import generateCSV from "../utils/csv.util.js";

const create = async (userId, cashRegisterData) => {
	try {
		const {
			initialAmount,
			changeAmount,
			cashBoxId,
		} = cashRegisterData;

		console.log("userId", userId);
		const user = await userRepository.getById(userId);
		if (!user) throw new ApiError("El usuario no existe", HTTP_STATUSES.NOT_FOUND);


		const newCashRegister = await cashRegisterRepository.create({
			initialAmount,
			changeAmount,
			userId,
			cashBoxId,
			date: new Date()
		});

		console.log("newCashRegister", {
			initialAmount,
			changeAmount,
			userId,
			cashBoxId,
			date: new Date()
		});

		const cashTerminal = await terminalRepository.getByDescription("EFECTIVO");
		console.log("newCashRegister.id", newCashRegister.id);
		console.log("cashTerminal.id", cashTerminal.id);
		await cashRegisterTerminalsRepository.createAssociation(newCashRegister.id, cashTerminal.id);

		console.log("newCashRegister", newCashRegister);
		return newCashRegister;
	} catch (error) {
		throw error;
	}
};

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
			initialAmount,
			changeAmount,
			observations,
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
			cashBoxId,
			batchNumber,
			isClosed
		} = cashRegisterData;

		const cashRegister = await cashRegisterRepository.getById(cashRegisterId);
		if (!cashRegister) throw new ApiError("El registro de caja no existe", HTTP_STATUSES.NOT_FOUND);

		cashRegister.initialAmount = initialAmount || cashRegister.initialAmount;
		cashRegister.changeAmount = changeAmount || cashRegister.changeAmount;
		cashRegister.observations = observations || cashRegister.observations;
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
		cashRegister.cashBoxId = cashBoxId || cashRegister.cashBoxId;
		cashRegister.batchNumber = batchNumber || cashRegister.batchNumber;
		if (isClosed) {
			cashRegister.isClosed = isClosed
		}

		// console.log(cashRegister);

		await cashRegisterRepository.save(cashRegister);
		return cashRegister;
	} catch (error) {
		throw error
	}
}

const checkIfCashRegisterExists = async (userId) => {
	try {
		const cashRegister = await cashRegisterRepository.getLastByUserId(userId);
		if (!cashRegister) return false;
		return true;
	} catch (error) {
		throw error
	}
}

const getLastByUserId = async (userId) => {
	try {
		const cashRegister = await cashRegisterRepository.getLastByUserId(userId);
		if (!cashRegister) throw new ApiError("El registro de caja no existe", HTTP_STATUSES.NOT_FOUND);

		return cashRegister;
	} catch (error) {
		throw error
	}
}

const exportToCSV = async () => {
	const data = await cashRegisterRepository.getAll();
	const fileName = await generateCSV(data);
	return fileName;
};

export const cashRegisterService = {
	create,
	getAll,
	getById,
	update,
	checkIfCashRegisterExists,
	getLastByUserId,
	exportToCSV
};