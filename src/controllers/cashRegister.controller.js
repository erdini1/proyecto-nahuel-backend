import { HTTP_STATUSES } from '../constants/http.constant.js';
import ApiError from '../errors/api.error.js';
import { cashRegisterService } from '../services/cashRegister.service.js';

const create = async (req, res, next) => {
	try {
		const cashRegister = await cashRegisterService.create(req.user.id, req.body);
		res.status(HTTP_STATUSES.CREATED).json(cashRegister);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const cashRegisters = await cashRegisterService.getAll();
		res.status(HTTP_STATUSES.OK).json(cashRegisters);
	} catch (error) {
		next(error)
	}
}

const getById = async (req, res, next) => {
	try {
		const cashRegister = await cashRegisterService.getById(req.params.cashRegisterId);
		res.status(HTTP_STATUSES.OK).json(cashRegister);
	} catch (error) {
		next(error)
	}
}

const update = async (req, res, next) => {
	try {
		const cashRegister = await cashRegisterService.update(req.params.cashRegisterId, req.body);
		res.status(HTTP_STATUSES.OK).json(cashRegister);
	} catch (error) {
		next(error)
	}
}

const checkIfCashRegisterExists = async (req, res, next) => {
	try {
		const cashRegister = await cashRegisterService.checkIfCashRegisterExists(req.user.id);
		res.status(HTTP_STATUSES.OK).json(cashRegister);
	} catch (error) {
		next(error)
	}
}

const getLastByUserId = async (req, res, next) => {
	try {
		const cashRegister = await cashRegisterService.getLastByUserId(req.user.id);
		res.status(HTTP_STATUSES.OK).json(cashRegister);
	} catch (error) {
		next(error)
	}
}

const downloadCSV = async (req, res, next) => {
	try {
		const filename = await cashRegisterService.exportToCSV();
		res.download(`src/exports/${filename}`, (err) => {
			if (err) {
				throw new ApiError("File has expired", 500);
			}
		});
	} catch (error) {
		next(error);
	}
};

export const cashRegisterController = {
	create,
	getAll,
	getById,
	update,
	checkIfCashRegisterExists,
	getLastByUserId,
	downloadCSV,
}
