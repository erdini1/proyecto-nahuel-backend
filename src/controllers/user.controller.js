// Crear el controllador para mostrar todos los usuarios y luego mosstrarlos en el front-end.
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

export const userController = {
	getAll
}
