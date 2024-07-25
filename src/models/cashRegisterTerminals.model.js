import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const CashRegisterTerminals = sequelize.define('CashRegisterTerminals', {
	cashRegisterId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'CashRegisters',
			key: 'id'
		}
	},
	terminalId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Terminals',
			key: 'id'
		}
	}
});

export default CashRegisterTerminals;