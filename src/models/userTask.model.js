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
	kilos: {
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	periodicity: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "recurring", // [daily, recurring]
	},
	createdAt: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
})

export default UserTask