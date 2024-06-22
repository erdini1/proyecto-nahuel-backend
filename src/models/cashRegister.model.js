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
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	changeAmount: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	totalCashInSystem: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	totalCashOnHand: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	difference: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	}
})

export default CashRegister