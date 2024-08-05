import { HTTP_STATUSES } from '../constants/http.constant.js';
import { taskSetService } from '../services/taskSet.service.js';

const create = async (req, res, next) => {
	try {
		const taskSet = await taskSetService.create(req.body, req.user.id);
		res.status(HTTP_STATUSES.CREATED).json(taskSet);
	} catch (error) {
		next(error)
	}
}

const getLastestById = async (req, res, next) => {
	try {
		const taskSet = await taskSetService.getLastestById(req.user.id);
		res.status(HTTP_STATUSES.OK).json(taskSet);
	} catch (error) {
		next(error)
	}
}

const update = async (req, res, next) => {
	try {
		const taskSet = await taskSetService.update(req.user.id, req.body);
		res.status(HTTP_STATUSES.OK).json(taskSet);
	} catch (error) {
		next(error)
	}
}

export const taskSetController = {
	create,
	getLastestById,
	update,
}
