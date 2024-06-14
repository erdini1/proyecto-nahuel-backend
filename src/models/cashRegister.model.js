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
	},
	initialAmount: {
		type: DataTypes.DECIMAL, // TODO: Ver si es mejor usar FLOAT
		allowNull: false,
	},
	changeAmount: {
		type: DataTypes.DECIMAL,
		allowNull: true,
	},
	totalCashInSystem: {
		type: DataTypes.DECIMAL,
		allowNull: true,
	},
	totalCashOnHand: {
		type: DataTypes.DECIMAL,
		allowNull: true,
	},
	difference: {
		type: DataTypes.DECIMAL,
		allowNull: true,
	}
})

export default CashRegister