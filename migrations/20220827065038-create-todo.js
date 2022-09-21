'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('todos', {
      id: {
       type: Sequelize.DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
      },
      title: {
       type: Sequelize.DataTypes.STRING,
       allowNull: false
      },
      completed: {
       type: Sequelize.DataTypes.BOOLEAN,
       allowNull: false,
       defaultValue: false
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE
      },      
  });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.dropTable('todos');
  }
};
