import { HTTP_STATUSES } from '../constants/http.constant.js';
import { authenticationService } from '../services/authentication.service.js';

const create = async (req, res, next) => {
	try {
		const user = await authenticationService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(user);
	} catch (error) {
		next(error)
	}
}

const update = async (req, res, next) => {
	try {
		const user = await authenticationService.update(+req.query.userId, req.body);
		res.status(HTTP_STATUSES.OK).json(user);
	} catch (error) {
		next(error)
	}
}

const login = async (req, res, next) => {
	try {
		const token = await authenticationService.login(req.body);
		res.status(HTTP_STATUSES.OK).json(token);
	} catch (error) {
		next(error)
	}
}

const forgotPassword = async (req, res, next) => {
	try {
		const user = await authenticationService.forgotPassword(req.params.userNumber, req.body);
		res.status(HTTP_STATUSES.OK).json(user);
	} catch (error) {
		next(error)
	}
}

const deleteById = async (req, res, next) => {
	try {
		await authenticationService.deleteById(+req.query.userId);
		res.status(HTTP_STATUSES.NO_CONTENT).json({ message: "User deleted" });
	} catch (error) {
		next(error)
	}
}

export const authenticationController = {
	create,
	update,
	login,
	forgotPassword,
	deleteById
}