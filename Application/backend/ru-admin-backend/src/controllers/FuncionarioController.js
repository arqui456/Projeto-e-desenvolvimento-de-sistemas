const sqlz = require("sequelize");
const { fn, where } = require("sequelize");
const Usuario = require('../models/Usuario');
const fs = require('fs');
const { parse } = require('csv-parse');
const dateTime = require('date-and-time');


module.exports = {
  async getFuncionarios(req, res) {
    try {
      let funcionarios;
      funcionarios = await Usuario.findAll();
      if(funcionarios){
        return res.status(200).json(funcionarios);
      } else {
        return res.status(400).json({error: 'Nenhum funcionário encontrado.'});
      } 
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao recuperar os funcionarios.'});
    }
  },
  async registerFuncionario(req, res) {
    try {
      const { nome, username, senha } = req.body.product;
      const funcionario = await Usuario.findOne({ 
          where: { nome }
        });
        if(!funcionario){
          const created = await Usuario.create({usuario_id: fn('uuid_generate_v4') ,nome: nome, username: username, senha:senha })
          return res.json(created);
        } else {
          return res.status(201).json({error: 'Funcionario com mesmo nome já cadastrado.'});
        }
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao registrar a Funcionario.'});
    }
  },
  async deletarFuncionario(req, res) {
    try {
      const { usuario_id } = req.body.product;
      const funcionario = await Usuario.findOne({ 
          where: { nome }
        });
        if(!funcionario){
          const created = await Usuario.destroy({where:{usuario_id}});
          return res.json(created);
        } else {
          return res.status(201).json({error: 'Funcionario com mesmo nome já cadastrado.'});
        }
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao registrar a Funcionario.'});
    }
  },
}