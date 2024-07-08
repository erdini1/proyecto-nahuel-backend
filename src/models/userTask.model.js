import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

// TODO: Ver si agrego un atributo mas para porcentaje de completado
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
	// shift: {
	// 	type: DataTypes.STRING,
	// 	allowNull: true,
	// },
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