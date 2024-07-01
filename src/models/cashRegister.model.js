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
	// totalCashInSystem: { // Se puede calcular con la suma de todas las ventas
	// 	type: DataTypes.DECIMAL(10, 2),
	// 	allowNull: true,
	// },
	// totalCashOnHand: {
	// 	type: DataTypes.DECIMAL(10, 2),
	// 	allowNull: true,
	// },
	salesWithCash: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	salesWithCards: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	salesWithCredit: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	salesWithMercadoPago: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	salesWithPointMaxiconsumo: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	cashToRenderWithCash: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	cashToRenderWithCards: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	cashToRenderWithCredit: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	cashToRenderWithMercadoPago: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	cashToRenderWithPointMaxiconsumo: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
})

export default CashRegister