import { HTTP_STATUSES } from '../constants/http.constant.js';
import { cancellationService } from '../services/cancellation.service.js';

const create = async (req, res, next) => {
	try {
		const cancellation = await cancellationService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(cancellation);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const cancellations = await cancellationService.getAll();
		res.status(HTTP_STATUSES.OK).json(cancellations);
	} catch (error) {
		next(error)
	}
}

const getById = async (req, res, next) => {
	try {
		const cancellation = await cancellationService.getById(req.params.cancellationId);
		res.status(HTTP_STATUSES.OK).json(cancellation);
	} catch (error) {
		next(error)
	}
}

const update = async (req, res, next) => {
	try {
		const cancellation = await cancellationService.update(req.params.cancellationId, req.body);
		res.status(HTTP_STATUSES.OK).json(cancellation);
	} catch (error) {
		next(error)
	}
}

const getByUserId = async (req, res, next) => {
	try {
		const cancellation = await cancellationService.getByUserId(req.user.id);
		res.status(HTTP_STATUSES.OK).json(cancellation);
	} catch (error) {
		next(error)
	}
}

const deleteById = async (req, res, next) => {
	try {
		await cancellationService.deleteById(req.params.cancellationId);
		res.status(HTTP_STATUSES.NO_CONTENT).send();
	} catch (error) {
		next(error)
	}
}

export const cancellationController = {
	create,
	getAll,
	getById,
	update,
	getByUserId,
	deleteById
}
