import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const UserTask = sequelize.define("UserTask", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	isCompleted: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	createdAt: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
})

export default UserTask