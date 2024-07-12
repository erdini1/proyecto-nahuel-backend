import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Task = sequelize.define("Task", {
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	type: {
		type: DataTypes.ENUM('general', 'elaboration'),
		allowNull: false,
	},
})

export default Task