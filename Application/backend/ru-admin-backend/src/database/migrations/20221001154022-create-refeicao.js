'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('refeicoes', {
      refeicao_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        default: Sequelize.fn('uuid_generate_v4'),
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('refeicoes');
  }
};
