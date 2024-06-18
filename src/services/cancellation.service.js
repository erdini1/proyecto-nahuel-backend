import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { cancellationRepository } from "../repositories/cancellation.repository.js";
import { cashRegisterRepository } from "../repositories/cashRegister.repository.js"

const create = async (cancellationData) => {
	try {
		const { type, method, amount, cashRegisterId } = cancellationData
		const cashRegister = await cashRegisterRepository.getById(cashRegisterId)
		if (!cashRegister) throw new ApiError("El registro de caja no existe", HTTP_STATUSES.NOT_FOUND)

		return await cancellationRepository.create({
			type,
			method,
			amount,
			cashRegisterId
		})
	} catch (error) {
		throw error
	}
}

const getAll = async () => {
	try {
		return await cancellationRepository.getAll();
	} catch (error) {
		throw error
	}
};

const getById = async (cancellationId) => {
	try {
		const cancellation = await cancellationRepository.getById(cancellationId);
		if (!cancellation) throw new ApiError("La anulación no existe", HTTP_STATUSES.NOT_FOUND);

		return cancellation;
	} catch (error) {
		throw error
	}
}

const update = async (cancellationId, cancellationData) => {
	try {
		const { type, method, amount } = cancellationData;

		const cancellation = await cancellationRepository.getById(cancellationId);
		if (!cancellation) throw new ApiError("La anulación no existe", HTTP_STATUSES.NOT_FOUND);

		cancellation.type = type || cancellation.type;
		cancellation.method = method || cancellation.method;
		cancellation.amount = amount || cancellation.amount;

		await cancellationRepository.save(cancellation);
		return cancellation;
	} catch (error) {
		throw error
	}
}


export const cancellationService = {
	create,
	getAll,
	getById,
	update,
};