'use strict';
const { fn } = require('sequelize');
const { ALMOCO, JANTAR } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('refeicoes', [{
      refeicao_id: fn('uuid_generate_v4'),
      nome: ALMOCO,
      valor: '3',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, {
      refeicao_id: fn('uuid_generate_v4'),
      nome: JANTAR,
      valor: '3',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }], {});
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
