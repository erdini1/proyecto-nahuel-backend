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
	const user = await User.findByPk(userId/* , {
		// include: {
		// 	model: Task,
		// 	through: {
		// 		attributtes: ["isCompleted", "shift"]
		// 	}
		// }
		include: [
			{
				model: Task,
				required: true,
				attributes: ['id', 'description', "sector"],
			},
			{
				model: User,
				required: true,
				attributes: ['id', 'firstName', 'lastName']
			}
		],
	} */)
	return user
}

const save = async (user) => {
	await user.save()
}

const getAll = async () => {
	const users = await User.findAll()
	return users
}

export const userRepository = {
	create,
	findUserByNumber,
	getById,
	save,
	getAll
}