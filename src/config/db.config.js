import Sequelize from "sequelize"
import { DB } from "./env-defaults.config.js"

const sequelize = new Sequelize(
	DB.DATABASE,
	DB.USERNAME,
	DB.PASSWORD,
	{
		host: DB.HOST,
		port: DB.PORT,
		dialect: "mysql",
		define: {
			timestamps: true
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		operatorAliases: false
	}
)

export default sequelize