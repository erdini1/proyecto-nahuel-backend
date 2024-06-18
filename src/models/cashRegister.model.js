import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CashRegister = sequelize.define("CashRegister", {
	cashRegisterNumber: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	initialAmount: {
		type: DataTypes.FLOAT, // TODO: Ver si es mejor usar FLOAT
		allowNull: false,
	},
	changeAmount: {
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	totalCashInSystem: {
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	totalCashOnHand: {
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	difference: {
		type: DataTypes.FLOAT,
		allowNull: true,
	}
})

export default CashRegister