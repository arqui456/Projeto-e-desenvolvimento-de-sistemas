'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryInterface.createTable('clientes', {
      cliente_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        default: Sequelize.fn('uuid_generate_v4'),
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      matricula: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      chave_pessoal: {
        type: Sequelize.UUID,
        default: Sequelize.fn('uuid_generate_v4'),
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
    await queryInterface.dropTable('clientes');
  }
};
