import { HTTP_STATUSES } from '../constants/http.constant.js';
import { providerService } from '../services/provider.service.js';

const create = async (req, res, next) => {
	try {
		const provider = await providerService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(provider);
	} catch (error) {
		next(error)
	}
}

const bulkCreate = async (req, res, next) => {
	try {
		const providers = await providerService.bulkCreate(req.body);
		res.status(HTTP_STATUSES.CREATED).json(providers);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const providers = await providerService.getAll();
		res.status(HTTP_STATUSES.OK).json(providers);
	} catch (error) {
		next(error)
	}
}

const getById = async (req, res, next) => {
	try {
		const provider = await providerService.getById(req.params.providerId);
		res.status(HTTP_STATUSES.OK).json(provider);
	} catch (error) {
		next(error)
	}
}

const update = async (req, res, next) => {
	try {
		const provider = await providerService.update(req.params.providerId, req.body);
		res.status(HTTP_STATUSES.OK).json(provider);
	} catch (error) {
		next(error)
	}
}

const deleteById = async (req, res, next) => {
	try {
		await providerService.deleteById(req.params.providerId);
		res.status(HTTP_STATUSES.NO_CONTENT).send();
	} catch (error) {
		next(error)
	}
}

export const providerController = {
	create,
	bulkCreate,
	getAll,
	getById,
	update,
	deleteById
}
