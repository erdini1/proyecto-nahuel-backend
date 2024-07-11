import { userSectorRepository } from "../repositories/userSector.repository.js";

const getAll = async () => {
	try {
		return await userSectorRepository.getAll()
	} catch (error) {
		throw error
	}
}

export const userSectorService = {
	getAll
};
