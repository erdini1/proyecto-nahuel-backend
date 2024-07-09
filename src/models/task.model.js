import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Task = sequelize.define("Task", {
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

export default Task