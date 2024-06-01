import { decode } from "../helpers/token.helper.js";
import { ROLE } from "../constants/role.constants.js";
import ApiError from "../errors/api.error.js";
import { HTTP_STATUSES } from "../constants/http.constant.js";

export const isAuthenticated = (req, res, next) => {
	const bearerToken = req.headers.authorization;

	if (bearerToken === undefined || !bearerToken)
		next(new ApiError("Acceso no autorizado, no se envio un token", HTTP_STATUSES.UNAUTHORIZED));

	try {
		const { id, firstName, lastName, userNumber, role } = decode(bearerToken);

		if (role != ROLE.ADMIN && role != ROLE.EMPLOYEE && ROLE.CASHIER) next(new ApiError("El token no es valido", HTTP_STATUSES.UNAUTHORIZED))

		const user = {
			id,
			firstName,
			lastName,
			userNumber,
			role,
		};

		req.user = user;
		next()
	} catch (error) {
		next(new ApiError(error.message));
	}
};

export const isCashier = (req, res, next) => {
	const bearerToken = req.headers.authorization;

	if (bearerToken === undefined || !bearerToken)
		next(new ApiError("Acceso no autorizado, no se envio un token", HTTP_STATUSES.UNAUTHORIZED));

	try {
		const { id, firstName, lastName, userNumber, role } = decode(bearerToken);

		if (role != ROLE.ADMIN && role != ROLE.CASHIER) next(new ApiError("Recuro reservado para usuarios con privilegios de cajero o administrador", HTTP_STATUSES.UNAUTHORIZED))

		const user = {
			id,
			firstName,
			lastName,
			userNumber,
			role,
		};

		req.user = user;
		next()
	} catch (error) {
		next(new ApiError(error.message));
	}
};

export const isAdmin = (req, res, next) => {
	const bearerToken = req.headers.authorization;

	if (bearerToken === undefined || !bearerToken)
		next(new ApiError("Acceso no autorizado, no se envio un token", HTTP_STATUSES.UNAUTHORIZED));

	try {
		const { id, firstName, lastName, userNumber, role } = decode(bearerToken);

		if (role != ROLE.ADMIN) next(new ApiError("Recuro reservado para usuarios con privilegios de administrador", HTTP_STATUSES.UNAUTHORIZED))

		const user = {
			id,
			firstName,
			lastName,
			userNumber,
			role,
		};

		req.user = user;
		next()
	} catch (error) {
		next(new ApiError(error.message));
	}
};
