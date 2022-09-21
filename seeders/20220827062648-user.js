'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert(
      'users', [
        {
          username: 'John',
          email: 'john@mail.com',
          password: bcrypt.hashSync('123456', 12),          
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'gift',
          email: 'gift@mail.com',
          password: bcrypt.hashSync('789456', 12),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'milk',
          email: 'milk@mail.com',
          password: bcrypt.hashSync('456123', 12),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
        {}
     );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
