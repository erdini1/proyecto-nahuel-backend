import { HTTP_STATUSES } from '../constants/http.constant.js';
import { userSectorService } from '../services/userSector.service.js';

const create = async (req, res, next) => {
	try {
		const userSector = await userSectorService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(userSector);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const userSectors = await userSectorService.getAll();
		res.status(HTTP_STATUSES.OK).json(userSectors);
	} catch (error) {
		next(error)
	}
}

export const userSectorController = {
	getAll,
	create
}
