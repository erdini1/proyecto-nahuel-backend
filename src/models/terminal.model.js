import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Terminal = sequelize.define("Terminal", {
	terminalNumber: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
		allowNull: false,
	},
})

export default Terminal