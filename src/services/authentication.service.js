import { HTTP_STATUSES } from "../constants/http.constant.js";
import { ROLE } from "../constants/role.constants.js";
import ApiError from "../errors/api.error.js";
import { comparePassword, hashPassword } from "../helpers/password.helpers.js";
import { encode } from "../helpers/token.helper.js";
import { sectorRepository } from "../repositories/sector.repository.js";
import { taskRepository } from "../repositories/task.repository.js";
import { taskSetRepository } from "../repositories/taskSet.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { userSectorRepository } from "../repositories/userSector.repository.js";
import { userTaskRepository } from "../repositories/userTask.respository.js";
import { userTaskService } from "./userTask.service.js";

// TODO: Limpiar y refactorizar 
const create = async (userData) => {
	try {
		const { firstName, lastName, number, role, Sectors } = userData;

		const user = await userRepository.findUserByNumber(number);
		if (user) throw new ApiError("El numero de empleado ya se encuentra registrado", HTTP_STATUSES.BAD_REQUEST);

		const tasks = await taskRepository.getAll();

		let generalTasks = [];
		if (tasks && tasks.length > 0) {
			generalTasks = tasks.filter(task => task.Sector.name == 'general');
		}

		let sectorTasks = [];
		let newRole = ROLE.EMPLOYEE;
		if (Sectors && Sectors.length > 0) {
			for (const sector of Sectors) {
				const sectorSpecificTasks = tasks.filter(task => task.Sector.name === sector.name);
				sectorTasks = sectorTasks.concat(sectorSpecificTasks);
			}
			newRole = Sectors.find(sector => sector.name == 'caja') ? ROLE.CASHIER : ROLE.EMPLOYEE;
		}

		const newUser = await userRepository.create({
			firstName,
			lastName,
			number,
			role: role === ROLE.ADMIN ? ROLE.ADMIN : newRole,
		});

		if (Sectors && Sectors.length > 0) {
			const userSectorRecords = Sectors.map(sector => ({
				userId: newUser.id,
				sectorId: sector.id
			}));
			await userSectorRepository.createMany(userSectorRecords);
		}

		const taskSet = await taskSetRepository.create({ userId: newUser.id, shift: "" });

		const allTasks = [...generalTasks, ...sectorTasks];
		const checklistItems = allTasks.map(task => ({
			taskId: task.id,
			isCompleted: false,
			userId: newUser.id,
			taskSetId: taskSet.id
		}));
		await userTaskRepository.createMany(checklistItems);

		return newUser;
	} catch (error) {
		throw error;
	}
};

const update = async (userId, userData) => {
	try {
		const { firstName, lastName, number, Sectors } = userData;

		const user = await userRepository.getById(userId);
		if (!user) throw new ApiError("El empleado no se encuentra registrado", 404);

		user.firstName = firstName || user.firstName;
		user.lastName = lastName || user.lastName;
		user.number = number || user.number;

		Sectors.find(sector => sector.name === 'caja') ? user.role = ROLE.CASHIER : user.role = ROLE.EMPLOYEE;

		const currentSectors = await user.getSectors();
		const newSectors = await sectorRepository.getAllBySectorIds(Sectors.map(sector => sector.id));

		// Verificar si los sectores han cambiado
		const currentSectorIds = currentSectors.map(sector => sector.id).sort();
		const newSectorIds = newSectors.map(sector => sector.id).sort();
		const sectorsChanged = JSON.stringify(currentSectorIds) !== JSON.stringify(newSectorIds);

		// Si los sectores han cambiado, se actualizan las tareas
		if (sectorsChanged) {
			let taskSet = await taskSetRepository.getLastestById(userId);
			if (!taskSet || taskSet.isClosed) {
				taskSet = await taskSetRepository.create({ userId, shift: "" });
			}

			const userTasks = await userTaskRepository.getByUserIdAndTaskSet(userId, taskSet.id);
			const tasks = await taskRepository.getAll();

			// Poner como inactivas las tareas que no correspondan a los nuevos sectores
			const tasksToRemove = userTasks.filter(userTask =>
				!newSectors.some(sector => sector.id === userTask.Task.Sector.id) &&
				userTask.Task.Sector.name !== 'general'
			);
			await userTaskService.removeMany(tasksToRemove.map(userTask => userTask.id));

			// Filtrar sectores nuevos
			const sectorIdsToAdd = newSectors.map(sector => sector.id).filter(sectorId => !currentSectorIds.includes(sectorId));

			const tasksToAdd = tasks.filter(task => sectorIdsToAdd.includes(task.Sector.id));
			const checklistItems = tasksToAdd.map(task => ({
				taskId: task.id,
				isCompleted: false,
				userId: user.id,
				taskSetId: taskSet.id
			}));
			await userTaskRepository.createMany(checklistItems);

			await user.removeSectors(currentSectors);
			await user.addSectors(newSectors);
		}

		await userRepository.save(user);
		return user;
	} catch (error) {
		throw error;
	}
};

const login = async (userData) => {
	try {
		const { number } = userData;

		const user = await userRepository.findUserByNumber(number);
		if (!user) throw new ApiError("El empleado no se encuentra registrado", HTTP_STATUSES.NOT_FOUND)

		const token = encode({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role
		});

		return { token };

	} catch (error) {
		throw error
	}
}

const forgotPassword = async (userNumber, userData) => {
	try {
		const { password } = userData;
		const user = await userRepository.findUserByNumber(userNumber);
		if (!user) throw new ApiError("El empleado no se encuentra registrado", HTTP_STATUSES.NOT_FOUND)
		user.password = await hashPassword(password);
		await userRepository.save(user);
		return user;
	} catch (error) {
		throw error;
	}
}

const deleteById = async (userId) => {
	try {
		const user = await userRepository.getById(userId);
		if (!user) throw new ApiError("El empleado no se encuentra registrado", HTTP_STATUSES.NOT_FOUND)
		user.isActive = false;
		await userRepository.save(user);
		return user;
	} catch (error) {
		throw error;
	}
}

export const authenticationService = {
	create,
	update,
	login,
	forgotPassword,
	deleteById
};