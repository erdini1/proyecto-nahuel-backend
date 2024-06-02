import { HTTP_STATUSES } from '../constants/http.constant.js';
import { taskService } from '../services/task.service.js';

const create = async (req, res, next) => {
	try {
		const task = await taskService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(task);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const tasks = await taskService.getAll();
		res.status(HTTP_STATUSES.OK).json(tasks);
	} catch (error) {
		next(error)
	}
}

const update = async (req, res, next) => {
	try {
		const task = await taskService.update(req.params.id, req.body);
		res.status(HTTP_STATUSES.OK).json(task);
	} catch (error) {
		next(error)
	}
}

const getById = async (req, res, next) => {
	try {
		const task = await taskService.getById(req.params.id);
		res.status(HTTP_STATUSES.OK).json(task);
	} catch (error) {
		next(error)
	}
}


export const taskController = {
	create,
	getAll,
	update,
	getById
}