import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const TaskSet = sequelize.define("TaskSet", {
	shift: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	observations: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	isClosed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	}
})

export default TaskSet