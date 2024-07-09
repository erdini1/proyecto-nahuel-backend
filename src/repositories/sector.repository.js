import { Sector } from '../models/index.model.js'

const create = async (sectorData) => {
	const sector = await Sector.create(sectorData)
	return sector
}

const getAll = async () => {
	const sectors = await Sector.findAll({
		order: [['name', 'ASC']]
	})
	return sectors
}

export const sectorRepository = {
	create,
	getAll
}