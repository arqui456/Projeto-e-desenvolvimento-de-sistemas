const sqlz = require("sequelize");
const { fn, where } = require("sequelize");
const Usuario = require('../models/Usuario');
const fs = require('fs');
const { parse } = require('csv-parse');
const dateTime = require('date-and-time');
const {encryptPassword} = require('../utils/encryption')


module.exports = {
  async getFuncionarios(req, res) {
    try {
      let funcionarios;
      funcionarios = await Usuario.findAll();
      if(funcionarios){
        console.log(funcionarios.length)
        for(let funcionario of funcionarios){
          funcionario.senha = ''
        }
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
      let { nome, username, senha } = req.body.product;
      senha = await encryptPassword(senha);
      console.log(senha);
      const funcionario = await Usuario.findOne({ 
          where: { nome }
        });
        if(!funcionario){
          const created = await Usuario.create({nome: nome, username: username, senha:senha })
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
      const { usuario_id } = req.body;
      const funcionario = await Usuario.findOne({ 
          where: { usuario_id }
        });
        if(funcionario){
          const created = await Usuario.destroy({where:{usuario_id}});
          return res.json(created);
        } else {
          return res.status(201).json({error: 'O funcionário não existe.'});
        }
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao Deletar a Funcionario.'});
    }
  },
  async editFuncionario(req, res) {
    try {
      let { nome, username, senha, usuario_id } = req.body.funcionario;
      senha = await encryptPassword(senha);
      const funcionario = await Usuario.findOne({ 
          where: { usuario_id }
        });
        if(funcionario){
          const created = await Usuario.update({nome: nome, username: username, senha:senha }, { where: {usuario_id: usuario_id} })
          return res.json(created);
        } else {
          return res.status(201).json({error: 'O funcionário não existe.'});
        }
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao Editar a Funcionario.'});
    }
  },
}