import { HTTP_STATUSES } from '../constants/http.constant.js';
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

const getByUserId = async (req, res, next) => {
	try {
		const cashRegister = await cashRegisterService.getByUserId(req.user.id);
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

export const cashRegisterController = {
	create,
	getAll,
	getById,
	update,
	getByUserId,
	checkIfCashRegisterExists
}