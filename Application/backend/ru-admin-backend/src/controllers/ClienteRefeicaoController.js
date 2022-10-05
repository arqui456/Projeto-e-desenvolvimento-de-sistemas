const { Op } = require("sequelize");
const ClienteRefeicao = require('../models/ClienteRefeicao');
const { filterWithJustStart, filterWithStartEnd, filterWithJustEnd } = require("../utils/clienteRefeicaoHelper");


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
        refeicoes = await ClienteRefeicao.findAll({include: { association: 'clienteInfo'}});
      }

      return res.status(200).json(refeicoes);
    } catch (err) {
      return res.status(500).json({error: err});
    }
  }
}