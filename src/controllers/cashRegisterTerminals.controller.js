import { HTTP_STATUSES } from '../constants/http.constant.js';
import { cashRegisterTerminalsService } from '../services/cashRegisterTerminals.service.js';

const createAssociation = async (req, res, next) => {
	try {
		const association = await cashRegisterTerminalsService.createAssociation(req.body);
		res.status(HTTP_STATUSES.CREATED).json(association);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const associations = await cashRegisterTerminalsService.getAll();
		res.status(HTTP_STATUSES.OK).json(associations);
	} catch (error) {
		next(error)
	}
}

const deleteAssociation = async (req, res, next) => {
	try {
		const association = await cashRegisterTerminalsService.deleteAssociation(req.body);
		res.status(HTTP_STATUSES.OK).json(association);
	} catch (error) {
		next(error)
	}
}

export const cashRegisterTerminalsController = {
	createAssociation,
	getAll,
	deleteAssociation,
}