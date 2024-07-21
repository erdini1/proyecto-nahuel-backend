import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CashBox = sequelize.define("CashBox", {
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	hasCheckingAccount: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
})

export default CashBox