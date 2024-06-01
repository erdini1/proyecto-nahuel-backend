import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import { hashPassword } from "../helpers/password.helpers.js";

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
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "EMPLOYEE",
		},
	}, {
	hooks: {
		beforeCreate: async (user) => {
			user.password = await hashPassword(user.password);
		}
	}
})

export default User