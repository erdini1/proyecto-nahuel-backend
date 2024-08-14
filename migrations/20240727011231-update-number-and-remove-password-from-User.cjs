'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'number', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.removeColumn('Users', 'password');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'number', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};