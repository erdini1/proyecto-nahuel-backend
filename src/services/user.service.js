import { userRepository } from "../repositories/user.repository.js";

const getAll = async () => {
	try {
		return await userRepository.getAll();
	} catch (error) {
		throw error
	}
};

const getByUser = async (userId) => {
	try {
		return await userRepository.getById(userId);
	} catch (error) {
		throw error
	}
}

export const userService = {
	getAll,
	getByUser
};
