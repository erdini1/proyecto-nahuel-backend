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

const bulkCreate = async (req, res, next) => {
	try {
		const terminals = await terminalService.bulkCreate(req.body);
		res.status(HTTP_STATUSES.CREATED).json(terminals);
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

const getByCashRegisterId = async (req, res, next) => {
	try {
		const terminal = await terminalService.getByCashRegisterId(req.params.cashRegisterId);
		res.status(HTTP_STATUSES.OK).json(terminal);
	} catch (error) {
		next(error)
	}
}

const deleteTerminal = async (req, res, next) => {
	try {
		await terminalService.deleteTerminal(req.params.terminalId);
		res.status(HTTP_STATUSES.NO_CONTENT).send();
	} catch (error) {
		next(error)
	}
}

export const terminalController = {
	create,
	bulkCreate,
	getAll,
	getById,
	update,
	getByCashRegisterId,
	deleteTerminal,
}
