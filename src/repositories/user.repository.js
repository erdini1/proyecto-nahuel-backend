import { Task, User } from '../models/index.model.js'

const create = async (userData) => {
	const user = await User.create(userData)
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

const getById = async (userId) => {
	const user = await User.findByPk(userId, {
		include: {
			model: Task,
			through: {
				attributtes: ["isCompleted", "shift"]
			}
		}
	})
	return user
}

const save = async (user) => {
	await user.save()
}

export const userRepository = {
	create,
	findUserByNumber,
	getById,
	save
}