import { HTTP_STATUSES } from '../constants/http.constant.js';
import { userTaskService } from '../services/userTask.service.js';


// TODO: Implementar que no se pueda crear otro userTask si ya existe uno en el mismo dia
// TODO: Agregar un endpoint para agregar nuevas tareas a un userTask ya existente
const create = async (req, res, next) => {
	try {
		const userTask = await userTaskService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(userTask);
	} catch (error) {
		next(error)
	}
}

const markTaskAsCompleted = async (req, res, next) => {
	try {
		const user = req.user
		const userTask = await userTaskService.markTaskAsCompleted(user.id, req.params.taskId);
		res.status(HTTP_STATUSES.OK).json(userTask);
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const userTasks = await userTaskService.getAll();
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

const getByUserId = async (req, res, next) => {
	try {
		const userTasks = await userTaskService.getByUserId(req.params.userId);
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

const getByUserIdAndDate = async (req, res, next) => {
	try {
		const userId = req.query.userId || req.user.id;
		const userTasks = await userTaskService.getByUserIdAndDate(+userId, req.query.date);
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

// TODO: me falto ver este
const getByTaskId = async (req, res, next) => {
	try {
		const userTasks = await userTaskService.getByTaskId(req.params.taskId);
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

export const userTaskController = {
	create,
	markTaskAsCompleted,
	getAll,
	getByUserId,
	getByUserIdAndDate,
	getByTaskId,
}
