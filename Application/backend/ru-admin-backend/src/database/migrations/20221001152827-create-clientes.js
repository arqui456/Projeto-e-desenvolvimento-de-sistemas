'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryInterface.createTable('clientes', {
      cliente_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal( 'uuid_generate_v4()' ),
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      matricula: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'actions_unique',
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'actions_unique',
      },
      qtd_refeicoes_gratis: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },{
      uniqueKeys: {
        actions_unique: {
          fields: ['cpf', 'matricula']
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clientes');
  }
};
