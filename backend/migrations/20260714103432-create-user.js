'use strict';

const { Sequelize } = require("sequelize");

module.exports = {

  async up(queryInterface, Sequelize){
    await queryInterface.createTable('Users', {

      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      email: {type: Sequelize.STRING, allowNull: false, unique: true},
      password_hash:{type: Sequelize.STRING, allowNull: false},
      name: {type: Sequelize.STRING, allowNull: false},
      role: {type: Sequelize.STRING, allowNull: false, defaultValue: 'user'},
      deleted_at: {type: Sequelize.DATE, allowNull: true},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt:{type: Sequelize.DATE, allowNull: false}
    })
  },

  async down(queryInterface, Sequelize){
    await queryInterface.dropTable('Users');
  }

};