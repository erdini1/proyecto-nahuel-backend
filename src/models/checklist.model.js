import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Checklist = sequelize.define("Checklist", {
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	isComplete: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
})

export default Checklist