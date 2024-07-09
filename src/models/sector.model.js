import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Sector = sequelize.define("Sector", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

export default Sector