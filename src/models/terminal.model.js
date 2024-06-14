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
})

export default Terminal