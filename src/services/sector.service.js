import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { sectorRepository } from "../repositories/sector.repository.js";

const create = async (sectorData) => {
	try {
		const sector = await sectorRepository.create(sectorData);
		return sector;
	} catch (error) {
		throw error;
	}
}

const getAll = async () => {
	try {
		const sectors = await sectorRepository.getAll();
		return sectors;
	} catch (error) {
		throw error;
	}
}

export const sectorService = {
	create,
	getAll
}

