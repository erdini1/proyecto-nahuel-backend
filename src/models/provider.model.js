import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Provider = sequelize.define("Provider", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	}
})

export default Provider