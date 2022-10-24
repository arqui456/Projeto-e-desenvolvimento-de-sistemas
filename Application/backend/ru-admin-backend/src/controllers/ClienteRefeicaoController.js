const ClienteRefeicao = require('../models/ClienteRefeicao');
const Refeicao = require('../models/Refeicao');
const Cliente = require("../models/Cliente");
const { LIMIT_ALMOCO, ALMOCO, JANTAR } = require('../utils/constants');
const { filterWithJustStart, filterWithStartEnd, filterWithJustEnd, association } = require("../utils/clienteRefeicaoHelper");
const sequelize = require('sequelize');


module.exports = {
  async getRefeicoes(req, res) {
    try {
      const { startDate, endDate } = req.query;
      
      let refeicoes;
      if (startDate && endDate) {
        refeicoes = await ClienteRefeicao.findAll(filterWithStartEnd(startDate, endDate));
      } else if (startDate) {
        refeicoes = await ClienteRefeicao.findAll(filterWithJustStart(startDate));
      } else if (endDate) {
        refeicoes = await ClienteRefeicao.findAll(filterWithJustEnd(startDate));
      } else {
        refeicoes = await ClienteRefeicao.findAll({...association});
      }
      return res.status(200).json(refeicoes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao recuperar as refeicoes.'});
    }
  },

  async registerMeal(req, res) {
    try {
      const { cliente_id } = req.params;
      
      const cliente = await Cliente.findByPk(cliente_id);
      const refeicao = await getRefeicaoByTime();
      if (!cliente || !refeicao ){
        return res.status(400).json({error: 'cliente ou tipo de refeicao nao encontrado.'});
      }
      const created = await ClienteRefeicao.create({cliente_id, refeicao_id: refeicao.refeicao_id})
      return res.json(created);
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao registrar a refeicao.'});
    }
  },
}

async function getRefeicaoByTime() {
  let nome = JANTAR;
  if (new Date() < LIMIT_ALMOCO) {
    nome = ALMOCO;
  }
  return  await Refeicao.findOne({ where: {nome} });
}