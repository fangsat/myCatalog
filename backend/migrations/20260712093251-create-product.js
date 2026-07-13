'use strict';
module.exports = {
  async up(queryInterface, Sequelize){
    await queryInterface.createTable('Products',{
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      name:{
        type: Sequelize.STRING,
        allowNull: false
      },

      description:{
        type: Sequelize.TEXT
      },

      base_price:{
        type: Sequelize.INTEGER,
        allowNull: false
      },

      is_active:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt:{
        type: Sequelize.DATE,
        allowNull: false
      }

    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Products');
  }
};