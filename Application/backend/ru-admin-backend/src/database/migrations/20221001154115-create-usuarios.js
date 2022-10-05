'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.createTable('users', {
    //   usuario_id: {
    //     type: Sequelize.UUID,
    //     primaryKey: true,
    //     default: Sequelize.fn('uuid_generate_v4'),
    //   },
    //   nome: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   username: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     unique: true,
    //   },
    //   senha: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    // });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
