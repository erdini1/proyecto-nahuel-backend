import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

// TODO: Agregar una nueva entidad para sector
const Task = sequelize.define("Task", {
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	sector: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

export default Task