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

const update = async (sectorId, sectorData) => {
	try {
		const { name } = sectorData;

		const sector = await sectorRepository.getById(sectorId);
		if (!sector) throw new ApiError("El sector no existe", HTTP_STATUSES.NOT_FOUND);

		sector.name = name || sector.name;

		await sectorRepository.save(sector);
		return sector;
	} catch (error) {
		throw error
	}
}

const deleteSector = async (sectorId) => {
	try {
		const sector = await sectorRepository.getById(sectorId);
		if (!sector) throw new ApiError("El sector no existe", HTTP_STATUSES.NOT_FOUND);

		await sectorRepository.deleteSector(sectorId);
	} catch (error) {
		throw error
	}
}

export const sectorService = {
	create,
	getAll,
	update,
	deleteSector
}

