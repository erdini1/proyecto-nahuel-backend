import { Sector, User, UserSector } from '../models/index.model.js'

const createMany = async (sectorData) => {
	const userSector = await UserSector.bulkCreate(sectorData)
	return userSector
}

const create = async (sectorData) => {
	const userSector = await UserSector.create(sectorData)
	return userSector
}

const getAll = async () => {
	const userSectors = await UserSector.findAll({
		// include: [
		// 	{
		// 		model: User,
		// 		required: true,
		// 		attributes: ['id', 'firstName', 'lastName']
		// 	},
		// 	{
		// 		model: Sector,
		// 		required: true,
		// 		attributes: ['id', 'name'],
		// 	},
		// ],
	})
	return userSectors
}

export const userSectorRepository = {
	createMany,
	create,
	getAll,
}