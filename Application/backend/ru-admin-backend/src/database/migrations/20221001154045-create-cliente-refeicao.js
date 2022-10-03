'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cliente_refeicao', {
      cliente_refeicao_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        default: Sequelize.fn('uuid_generate_v4'),
      },
      cliente_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      refeicao_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('cliente_refeicao');
  }
};
