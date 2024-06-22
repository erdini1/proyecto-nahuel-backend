import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CashMovement = sequelize.define("CashMovement", {
	type: {	// Pago o retiro
		type: DataTypes.STRING,
		allowNull: false,
	},
	amount: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	time: {
		type: DataTypes.TIME,
		allowNull: false,
	},
})

export default CashMovement