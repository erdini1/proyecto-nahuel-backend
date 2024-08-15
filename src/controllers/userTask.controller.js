import { HTTP_STATUSES } from '../constants/http.constant.js';
import { userTaskService } from '../services/userTask.service.js';

// REVISADO
const create = async (req, res, next) => {
	try {
		const userTask = await userTaskService.create(req.body);
		res.status(HTTP_STATUSES.CREATED).json(userTask);
	} catch (error) {
		next(error)
	}
}

// REVISADO
const markTaskAsCompleted = async (req, res, next) => {
	try {
		const userTask = await userTaskService.markTaskAsCompleted(req.user.id, req.params.taskId, req.body);
		res.status(HTTP_STATUSES.OK).json(userTask);
	} catch (error) {
		next(error)
	}
}

const markTaskAsOptional = async (req, res, next) => {
	try {
		const userTask = await userTaskService.markTaskAsOptional(req.params.userTaskId, req.body);
		res.status(HTTP_STATUSES.OK).json(userTask);
	} catch (error) {
		next(error)
	}
}

const markTaskAsShouldDo = async (req, res, next) => {
	try {
		const userTask = await userTaskService.markTaskAsShouldDo(req.params.userTaskId, req.body);
		res.status(HTTP_STATUSES.OK).json(userTask);
	} catch (error) {
		next(error)
	}
}

// NO REVISADO
const getAll = async (req, res, next) => {
	try {
		const userTasks = await userTaskService.getAll();
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

// NO REVISADO
const getByUserId = async (req, res, next) => {
	try {
		const userTasks = await userTaskService.getByUserId(req.params.userId);
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

// REVISADO
const getByUserIdAndTaskSet = async (req, res, next) => {
	try {
		const userId = req.query.userId || req.user.id;
		const userTasks = await userTaskService.getByUserIdAndTaskSet(+userId);
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

// NO REVISADO
const getByDate = async (req, res, next) => {
	try {
		const userTasks = await userTaskService.getByDate(req.query.date);
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

const getAllByTaskSetNotClosed = async (req, res, next) => {
	try {
		const userTasks = await userTaskService.getAllByTaskSetNotClosed();
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

// NO REVISADO
const getByRangeOfDates = async (req, res, next) => {
	try {
		const userTasks = await userTaskService.getByRangeOfDates(req.query.userId, req.query.startDate, req.query.endDate);
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

const getByTaskSetId = async (req, res, next) => {
	try {
		const userTasks = await userTaskService.getByTaskSetId(req.params.taskSetId);
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

// NO REVISADO
const getByTaskId = async (req, res, next) => {
	try {
		const userTasks = await userTaskService.getByTaskId(req.params.taskId);
		res.status(HTTP_STATUSES.OK).json(userTasks);
	} catch (error) {
		next(error)
	}
}

// REVISADO
const disableUserTask = async (req, res, next) => {
	try {
		const userTask = await userTaskService.disableUserTask(req.params.userTaskId, req.body.isActive);
		res.status(HTTP_STATUSES.OK).json(userTask);
	} catch (error) {
		next(error)
	}
}

const updateTaskOrder = async (req, res, next) => {
	try {
		const userTask = await userTaskService.updateTaskOrder(req.body, req.params.userId);
		res.status(HTTP_STATUSES.OK).json(userTask);
	} catch (error) {
		next(error)
	}
}

export const userTaskController = {
	create,
	markTaskAsCompleted,
	markTaskAsOptional,
	markTaskAsShouldDo,
	getAll,
	getByUserId,
	getByUserIdAndTaskSet,
	getByDate,
	getAllByTaskSetNotClosed,
	getByRangeOfDates,
	getByTaskSetId,
	getByTaskId,
	disableUserTask,
	updateTaskOrder
}
