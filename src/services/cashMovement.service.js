import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import formatDate from "../helpers/formatDate.helper.js";
import { cashMovementRepository } from "../repositories/cashMovement.repository.js";
import { cashRegisterRepository } from "../repositories/cashRegister.repository.js"
import { providerRepository } from "../repositories/provider.repository.js";

const create = async (cashMovementData) => {
	try {
		const { /* type, */ amount, cashRegisterId, providerId } = cashMovementData

		const cashRegister = await cashRegisterRepository.getById(cashRegisterId)
		if (!cashRegister) throw new ApiError("El registro de caja no existe", HTTP_STATUSES.NOT_FOUND)

		const provider = await providerRepository.getById(providerId)
		if (!provider) throw new ApiError("El proveedor no existe", HTTP_STATUSES.NOT_FOUND)

		return await cashMovementRepository.create({
			type: "withdrawal",
			amount,
			time: formatDate(new Date()),
			cashRegisterId,
			providerId
		})
	} catch (error) {
		throw error
	}
}

const getAll = async () => {
	try {
		return await cashMovementRepository.getAll();
	} catch (error) {
		throw error
	}
};

const getById = async (cashMovementId) => {
	try {
		const cashMovement = await cashMovementRepository.getById(cashMovementId);
		if (!cashMovement) throw new ApiError("El movimiento de dinero no existe", HTTP_STATUSES.NOT_FOUND);

		return cashMovement;
	} catch (error) {
		throw error
	}
}

const update = async (cashMovementId, cashMovementData) => {
	try {
		const { type, amount } = cashMovementData;

		const cashMovement = await cashMovementRepository.getById(cashMovementId);
		if (!cashMovement) throw new ApiError("El movimiento de dinero no existe", HTTP_STATUSES.NOT_FOUND);

		cashMovement.type = type || cashMovement.type;
		cashMovement.amount = amount || cashMovement.amount;

		await cashMovementRepository.save(cashMovement);
		return cashMovement;
	} catch (error) {
		throw error
	}
}

const getByUserId = async (userId) => {
	try {
		const cashRegister = await cashRegisterRepository.getLastByUserId(userId);
		if (!cashRegister) return []

		const cashMovements = await cashMovementRepository.getByCashRegisterId(cashRegister.id);
		return cashMovements;
	} catch (error) {
		throw error
	}
}

const deleteById = async (cashMovementId) => {
	try {
		const cashMovement = await cashMovementRepository.getById(cashMovementId);
		if (!cashMovement) throw new ApiError("El movimiento no existe", HTTP_STATUSES.NOT_FOUND);
		await cashMovementRepository.deleteById(cashMovementId);
	} catch (error) {
		throw error
	}
}

export const cashMovementService = {
	create,
	getAll,
	getById,
	update,
	getByUserId,
	deleteById
};