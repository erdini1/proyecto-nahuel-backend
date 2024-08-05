import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { providerRepository } from "../repositories/provider.repository.js";

const create = async (providerData) => {
	try {
		const { name } = providerData

		return await providerRepository.create({ name })
	} catch (error) {
		throw error
	}
}

const getAll = async () => {
	try {
		return await providerRepository.getAll();
	} catch (error) {
		throw error
	}
};

const getById = async (providerId) => {
	try {
		const provider = await providerRepository.getById(providerId);
		if (!provider) throw new ApiError("El proveedor no existe", HTTP_STATUSES.NOT_FOUND);

		return provider;
	} catch (error) {
		throw error
	}
}

const update = async (providerId, providerData) => {
	try {
		const { name } = providerData;

		const provider = await providerRepository.getById(providerId);
		if (!provider) throw new ApiError("El proveedor no existe", HTTP_STATUSES.NOT_FOUND);

		provider.name = name || provider.name;

		await providerRepository.save(provider);
		return provider;
	} catch (error) {
		throw error
	}
}

const deleteById = async (providerId) => {
	try {
		const provider = await providerRepository.getById(providerId);
		if (!provider) throw new ApiError("El proveedor no existe", HTTP_STATUSES.NOT_FOUND);

		provider.isActive = false;

		await providerRepository.save(provider);
	} catch (error) {
		throw error
	}
}

export const providerService = {
	create,
	getAll,
	getById,
	update,
	deleteById
};