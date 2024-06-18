import { HTTP_STATUSES } from '../constants/http.constant.js';
import { terminalService } from '../services/terminal.service.js';

const create = async (req, res, next) => {
	try {
		const terminal = await terminalService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(terminal);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const terminals = await terminalService.getAll();
		res.status(HTTP_STATUSES.OK).json(terminals);
	} catch (error) {
		next(error)
	}
}

const getById = async (req, res, next) => {
	try {
		const terminal = await terminalService.getById(req.params.terminalId);
		res.status(HTTP_STATUSES.OK).json(terminal);
	} catch (error) {
		next(error)
	}
}

const update = async (req, res, next) => {
	try {
		const terminal = await terminalService.update(req.params.terminalId, req.body);
		res.status(HTTP_STATUSES.OK).json(terminal);
	} catch (error) {
		next(error)
	}
}

export const terminalController = {
	create,
	getAll,
	getById,
	update,
}
