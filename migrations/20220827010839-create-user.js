'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('users', {
       id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
       },
       username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
       },
       email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
       },
       password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
       },
       created_at: {
        type: Sequelize.DataTypes.DATE
       },
       updated_at: {
        type: Sequelize.DataTypes.DATE
       } 
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.dropTable('users');
  }
};
