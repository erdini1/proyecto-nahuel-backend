import { Provider } from '../models/index.model.js'

const create = async (providerData) => {
	const provider = await Provider.create(providerData)
	return provider?.dataValues
}

const bulkCreate = async (providersData) => {
	const providers = await Provider.bulkCreate(providersData)
	return providers
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
	bulkCreate,
	save,
	getAll,
	getById,
}