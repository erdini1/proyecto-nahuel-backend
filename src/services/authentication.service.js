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

const create = async (userData) => {
	try {
		const { firstName, lastName, number, password, sectors } = userData;

		const user = await userRepository.findUserByNumber(number);
		if (user) throw new ApiError("El numero de empleado ya se encuentra registrado", HTTP_STATUSES.BAD_REQUEST);

		const tasks = await taskRepository.getAll();
		let generalTasks = [];
		if (tasks && tasks.length > 0) generalTasks = tasks.filter(task => task.sector === 'general');

		let sectorTasks = [];
		if (sectors && sectors.length > 0) {
			for (const sector of sectors) {
				const sectorSpecificTasks = tasks.filter(task => task.sector === sector);
				sectorTasks = sectorTasks.concat(sectorSpecificTasks);
			}
		}

		const role = sectors.find(sector => sector.name === 'Caja') ? ROLE.CASHIER : ROLE.EMPLOYEE;

		const newUser = await userRepository.create({
			firstName,
			lastName,
			number,
			password,
			role
		});

		if (role === 'admin') return newUser;

		if (sectors && sectors.length > 0) {
			const userSectorRecords = sectors.map(sector => ({
				userId: newUser.id,
				sectorId: sector.id
			}));
			await userSectorRepository.createMany(userSectorRecords);
		}

		const allTasks = [...generalTasks, ...sectorTasks];

		let taskSet = await taskSetRepository.getLastestById(newUser.id);
		if (!taskSet || taskSet.isClosed) {
			taskSet = await taskSetRepository.create({ userId: newUser.id, shift: "" });
		}

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
		const { firstName, lastName, number, password, Sectors } = userData;

		const user = await userRepository.getById(userId);
		if (!user) throw new ApiError("El empleado no se encuentra registrado", 404);

		user.firstName = firstName || user.firstName;
		user.lastName = lastName || user.lastName;
		user.number = number || user.number;
		if (password) user.password = await hashPassword(password);
		Sectors.find(sector => sector.name === 'Caja') ? user.role = ROLE.CASHIER : user.role = ROLE.EMPLOYEE;

		const currentSectors = await user.getSectors();
		const newSectors = await sectorRepository.getAllBySectorIds(Sectors.map(sector => sector.id));

		await user.removeSectors(currentSectors);
		await user.addSectors(newSectors);

		await userRepository.save(user);
		return user;
	} catch (error) {
		console.error('Error updating user:', error);
		throw new ApiError(error.message, error.status || 500);
	}
};

const login = async (userData) => {
	try {
		const { number, password } = userData;

		const user = await userRepository.findUserByNumber(number);
		if (!user) throw new ApiError("El empleado no se encuentra registrado", HTTP_STATUSES.NOT_FOUND)

		const isValidPassword = await comparePassword(password, user.password);
		if (!isValidPassword) throw new ApiError("La contraseña es incorrecta", HTTP_STATUSES.UNAUTHORIZED)

		const token = encode({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			number: user.number,
			role: user.role
		});

		return { token };

	} catch (error) {
		throw error
	}
}

const forgotPassword = async (userNumber, userData) => {
	const { password } = userData;
	const user = await userRepository.findUserByNumber(userNumber);
	if (!user) throw new ApiError("El empleado no se encuentra registrado", HTTP_STATUSES.NOT_FOUND)
	user.password = await hashPassword(password);
	await userRepository.save(user);
	return user;
}

const deleteById = async (userId) => {
	const user = await userRepository.getById(userId);
	if (!user) throw new ApiError("El empleado no se encuentra registrado", HTTP_STATUSES.NOT_FOUND)
	user.isActive = false;
	await userRepository.save(user);
	return user;
}

export const authenticationService = {
	create,
	update,
	login,
	forgotPassword,
	deleteById
};