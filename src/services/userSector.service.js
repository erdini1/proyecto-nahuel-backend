import { userSectorRepository } from "../repositories/userSector.repository.js";

const create = async (userSectorData) => {
	try {
		const { userId, sectorId } = userSectorData
		return await userSectorRepository.create({
			userId,
			sectorId
		})
	} catch (error) {
		throw error
	}
}

const getAll = async () => {
	try {
		return await userSectorRepository.getAll()
	} catch (error) {
		throw error
	}
}

export const userSectorService = {
	getAll,
	create
};
