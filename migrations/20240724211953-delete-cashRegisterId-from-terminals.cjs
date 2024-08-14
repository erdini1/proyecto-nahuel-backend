'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Terminals', 'cashRegisterId');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Terminals', 'cashRegisterId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'CashRegisters',
        key: 'id'
      }
    });
  }
};

