import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CashRegister = sequelize.define("CashRegister", {
	// cashRegisterNumber: {
	// 	type: DataTypes.INTEGER,
	// 	allowNull: false,
	// },
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
	observations: {
		type: DataTypes.STRING,
		allowNull: true,
	},
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
	isClosed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})

export default CashRegister