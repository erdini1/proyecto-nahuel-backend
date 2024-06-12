import jwt from "jsonwebtoken"
import { JWT } from "../config/env-defaults.config.js"

const generateToken = () => Math.random().toString(32).substring(2) + Date.now().toString(32)

const encode = (payload) => {
	try {
		return jwt.sign(payload, JWT.SECRET/* , { expiresIn: "1d" } */)
	} catch (error) {
		return null
	}
}

const decode = (bearerToken) => {
	const token = bearerToken.split(" ")[1]
	// Verificar si el token tiene comillas dobles y si las tiene, se eliminan.
	const stringToken = token.startsWith('"') ? token.split('"')[1] : token
	return jwt.verify(stringToken, JWT.SECRET/* , (error, decoded) => {
		if (error) {
			return null
		}
		return decoded
	} */)
}

export {
	generateToken,
	encode,
	decode
}