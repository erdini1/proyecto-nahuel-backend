'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CashRegisterTerminals', {
      cashRegisterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CashRegisters',
          key: 'id'
        }
      },
      terminalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Terminals',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CashRegisterTerminals');
  }
};
