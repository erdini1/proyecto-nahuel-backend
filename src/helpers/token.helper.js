import jwt from "jsonwebtoken"
import { JWT } from "../config/env-defaults.config.js"

const generateToken = () => Math.random().toString(32).substring(2) + Date.now().toString(32)

const encode = (payload) => {
	return jwt.sign(payload, JWT.SECRET/* , { expiresIn: "1d" } */)
}

const decode = (bearerToken) => {
	const token = bearerToken.split(" ")[1]
	return jwt.verify(token, JWT.SECRET)
}

export {
	generateToken,
	encode,
	decode
}