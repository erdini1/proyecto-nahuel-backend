import { HTTP_STATUSES } from '../constants/http.constant.js';
import { cashBoxService } from '../services/cashBox.service.js';

const create = async (req, res, next) => {
	try {
		const cashBox = await cashBoxService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(cashBox);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const cashBoxs = await cashBoxService.getAll();
		res.status(HTTP_STATUSES.OK).json(cashBoxs);
	} catch (error) {
		next(error)
	}
}

const getById = async (req, res, next) => {
	try {
		const cashBox = await cashBoxService.getById(req.params.cashBoxId);
		res.status(HTTP_STATUSES.OK).json(cashBox);
	} catch (error) {
		next(error)
	}
}

const update = async (req, res, next) => {
	try {
		const cashBox = await cashBoxService.update(req.params.cashBoxId, req.body);
		res.status(HTTP_STATUSES.OK).json(cashBox);
	} catch (error) {
		next(error)
	}
}

const deleteById = async (req, res, next) => {
	try {
		await cashBoxService.deleteById(req.params.cashBoxId);
		res.status(HTTP_STATUSES.NO_CONTENT).send();
	} catch (error) {
		next(error)
	}
}

export const cashBoxController = {
	create,
	getAll,
	getById,
	update,
	deleteById
}
