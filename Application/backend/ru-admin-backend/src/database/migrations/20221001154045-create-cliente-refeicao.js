'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cliente_refeicao', {
      cliente_refeicao_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal( 'uuid_generate_v4()' ),
      },
      cliente_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'clientes', key: 'cliente_id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      refeicao_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'refeicoes', key: 'refeicao_id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
