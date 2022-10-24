'use strict';
const bcrypt = require('bcrypt');
const { fn } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      usuario_id: fn('uuid_generate_v4'),
      nome: 'Alex',
      username: 'AlexPROEST',
      senha: '$2b$10$Wbxg2RoC1H/Ah3Ni/O64yew0vljFauCocdATFB4t/xq26IpqPcXNe',
      super_user: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, {
      usuario_id: fn('uuid_generate_v4'),
      nome: 'Funcionario(a)',
      username: 'funcionarioRU',
      senha: '$2b$10$lhySJ6XZjCpv.NBT/EA9ZOeKPtylvAvrfnrV9kit03K6HofLVVKu.',
      super_user: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
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
