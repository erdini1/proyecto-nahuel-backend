import { HTTP_STATUSES } from "../constants/http.constant.js";
import ApiError from "../errors/api.error.js";
import { comparePassword, hashPassword } from "../helpers/password.helpers.js";
import { encode } from "../helpers/token.helper.js";
import { userRepository } from "../repositories/user.repository.js";

const create = async (userData) => {
	try {
		const { firstName, lastName, number, password } = userData;

		const user = await userRepository.findUserByNumber(number);
		if (user) throw new ApiError("El numero de empleado ya se encuentra registrado", HTTP_STATUSES.BAD_REQUEST)

		return await userRepository.create({
			firstName,
			lastName,
			number,
			password
		});
	} catch (error) {
		throw error
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

// TODO: Ver bien los temas de Seguridad, solo el administrador debe poder cambiar la contraseña de un empleado.
// TODO: Impelementar middleware para verificar roles de usuario.
const forgotPassword = async (userNumber, userData) => {
	const { password } = userData;
	const user = await userRepository.findUserByNumber(userNumber);
	if (!user) throw new ApiError("El empleado no se encuentra registrado", HTTP_STATUSES.NOT_FOUND)
	user.password = await hashPassword(password);
	await userRepository.save(user);
	return user;
}

export const authenticationService = {
	create,
	login,
	forgotPassword
};