import User from "../models/user.model.js"

const create = async (userData) => {
	const user = await User.create(userData)
	return user?.dataValues
}

const findUserByNumberAndPassword = async (number, password) => {
	const user = await User.findOne({
		where: {
			number,
			password
		}
	})
	return user?.dataValues
}

const findUserByNumber = async (number) => {
	const user = await User.findOne({
		where: {
			number
		}
	})
	return user
}

const save = async (user) => {
	await user.save()
}

export const userRepository = {
	create,
	findUserByNumberAndPassword,
	findUserByNumber,
	save
}