import { Sector, Task, User } from '../models/index.model.js'

const create = async (userData) => {
	const user = await User.create(userData)
	return user?.dataValues
}

const findUserByNumber = async (number) => {
	const user = await User.findOne({
		where: {
			number,
			isActive: true
		}
	})
	return user
}

// Mostrar los datos de un usuario por su id que esten activos
const getById = async (userId) => {
	const user = await User.findByPk(userId, {
		where: {
			isActive: true
		},
		include: [
			{
				model: Sector,
				required: true,
				attributes: ['id', 'name'],
			},
		],
	})
	return user
}

const save = async (user) => {
	await user.save()
}

const getAll = async () => {
	const users = await User.findAll({
		include: [
			{
				model: Sector,
				required: true,
				attributes: ['id', 'name'],
				through: {
					attributes: []
				},
			},
		],
		attributes: {
			exclude: ['updatedAt', 'createdAt',]
		},
		where: {
			isActive: true,
		},
		order: [['firstName', 'ASC']]
	})
	return users
}

export const userRepository = {
	create,
	findUserByNumber,
	getById,
	save,
	getAll
}