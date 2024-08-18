import { HTTP_STATUSES } from '../constants/http.constant.js';
import { sectorService } from '../services/sector.service.js';

const create = async (req, res, next) => {
	try {
		const sector = await sectorService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(sector);
	} catch (error) {
		next(error)
	}
}

const bulkCreate = async (req, res, next) => {
	try {
		const sector = await sectorService.bulkCreate(req.body);
		res.status(HTTP_STATUSES.CREATED).json(sector);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const sectors = await sectorService.getAll();
		res.status(HTTP_STATUSES.OK).json(sectors);
	} catch (error) {
		next(error)
	}
}

const update = async (req, res, next) => {
	try {
		const sector = await sectorService.update(req.params.id, req.body);
		res.status(HTTP_STATUSES.OK).json(sector);
	} catch (error) {
		next(error)
	}
}

const deleteSector = async (req, res, next) => {
	try {
		await sectorService.deleteSector(req.params.id);
		res.status(HTTP_STATUSES.NO_CONTENT).send();
	} catch (error) {
		next(error)
	}
}

export const sectorController = {
	create,
	bulkCreate,
	getAll,
	update,
	deleteSector
}