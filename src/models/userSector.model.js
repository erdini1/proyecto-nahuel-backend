import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const UserSector = sequelize.define('UserSector', {
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'Users',
			key: 'id'
		},
		onDelete: 'CASCADE'
	},
	sectorId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'Sectors',
			key: 'id'
		},
		onDelete: 'CASCADE'
	}
});

export default UserSector;