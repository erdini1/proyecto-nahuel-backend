import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Cancellation = sequelize.define("Cancellation", {
	type: {	// Anulación o devolución
		type: DataTypes.STRING,
		allowNull: false,
	},
	method: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	amount: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
})

export default Cancellation