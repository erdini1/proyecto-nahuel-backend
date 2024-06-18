import { HTTP_STATUSES } from '../constants/http.constant.js';
import { cashMovementService } from '../services/cashMovement.service.js';

const create = async (req, res, next) => {
	try {
		const cashMovement = await cashMovementService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(cashMovement);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const cashMovements = await cashMovementService.getAll();
		res.status(HTTP_STATUSES.OK).json(cashMovements);
	} catch (error) {
		next(error)
	}
}

const getById = async (req, res, next) => {
	try {
		const cashMovement = await cashMovementService.getById(req.params.cashMovementId);
		res.status(HTTP_STATUSES.OK).json(cashMovement);
	} catch (error) {
		next(error)
	}
}

const update = async (req, res, next) => {
	try {
		const cashMovement = await cashMovementService.update(req.params.cashMovementId, req.body);
		res.status(HTTP_STATUSES.OK).json(cashMovement);
	} catch (error) {
		next(error)
	}
}

const getByUserId = async (req, res, next) => {
	try {
		const cashMovements = await cashMovementService.getByUserId(req.user.id);
		// const cashMovements = await cashMovementService.getByUserId(req.params.userId);
		res.status(HTTP_STATUSES.OK).json(cashMovements);
	} catch (error) {
		next(error)
	}
}

export const cashMovementController = {
	create,
	getAll,
	getById,
	update,
	getByUserId
}
