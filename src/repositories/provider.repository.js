import { Provider } from '../models/index.model.js'

const create = async (providerData) => {
	const provider = await Provider.create(providerData)
	return provider?.dataValues
}

const getAll = async () => {
	const providers = await Provider.findAll({
		order: [['name', 'ASC']]
	})
	return providers
}

const getById = async (providerId) => {
	const provider = await Provider.findByPk(providerId)
	return provider
}

const save = async (provider) => {
	await provider.save()
}

export const providerRepository = {
	create,
	save,
	getAll,
	getById,
}