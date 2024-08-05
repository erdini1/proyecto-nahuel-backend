import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Sector = sequelize.define("Sector", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
		allowNull: false,
	},
})

export default Sector