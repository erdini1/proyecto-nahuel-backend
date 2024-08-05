import { HTTP_STATUSES } from '../constants/http.constant.js';
import { userService } from '../services/user.service.js';

const getAll = async (req, res, next) => {
	try {
		const users = await userService.getAll();
		res.status(HTTP_STATUSES.OK).json(users);
	} catch (error) {
		next(error)
	}
}

const getMyUser = async (req, res, next) => {
	try {
		const user = await userService.getByUser(req.user.id);
		res.status(HTTP_STATUSES.OK).json(user);
	} catch (error) {
		next(error)
	}
}

const getById = async (req, res, next) => {
	try {
		const user = await userService.getByUser(+req.params.userId);
		res.status(HTTP_STATUSES.OK).json(user);
	} catch (error) {
		next(error)
	}
}

export const userController = {
	getAll,
	getMyUser,
	getById
}
