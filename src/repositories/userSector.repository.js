import { UserSector } from '../models/index.model.js'

const createMany = async (sectorData) => {
	const userSector = await UserSector.bulkCreate(sectorData)
	return userSector
}

export const userSectorRepository = {
	createMany
}