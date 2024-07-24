import { Sector, User } from '../models/index.model.js'

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

const getById = async (sectorId) => {
	const sector = await Sector.findByPk(sectorId)
	return sector
}

const getAllBySectorIds = async (sectorIds) => {
	const userSectors = await Sector.findAll({
		where: {
			id: sectorIds
		},
	})
	return userSectors
}

const save = async (sector) => {
	await sector.save()
}

export const sectorRepository = {
	create,
	getAll,
	getAllBySectorIds,
	getById,
	save,
}