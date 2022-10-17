'use strict';
const { fn } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clientes', [{
      cliente_id: fn('uuid_generate_v4'),
      nome: 'Joaozinho',
      matricula: '12345678',
      cpf: '12345678911',
      qtd_refeicoes_gratis: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
