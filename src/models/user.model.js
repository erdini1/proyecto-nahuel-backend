import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import { hashPassword } from "../helpers/password.helpers.js";
import { ROLE } from "../constants/role.constants.js";

const User = sequelize.define("User",
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		number: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ROLE.EMPLOYEE,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	}
)

export default User