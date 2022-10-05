const Cliente = require('../models/Cliente');
const Refeicao = require('../models/Refeicao');

module.exports = {
  async store(req, res) {
    try {
      const { nome, matricula, cpf } = req.body;
      const cliente = await Cliente.create({ nome, matricula, cpf});
      return res.status(200).json(cliente);
    } catch (err) {
      return res.status(500).json({error: err.name});
    }
  },

  async getCliente(req, res) {
    try {
      const { cpf, matricula } = req.query;

      let cliente;
      if (cpf) {
        cliente = await Cliente.findOne({ where: { cpf }, include: {association: 'refeicoes'}});
      } else if (matricula) {
        cliente = await Cliente.findOne({ where: { matricula }});
      } else {
        return res.status(400).json({error: 'CPF ou matricula necessarios para realizar a consulta.'});
      }

      if (!cliente){
        return res.status(400).json({error: 'cliente nao encontrado.'});
      }

      return res.json(cliente);
    } catch (err) {
      console.log(err)
      return res.status(500).json({error: err});
    }
  },

  async registerMeal(req, res) {
    try {
      const { cliente_id } = req.params;
      const { nome } = req.body;
      
      const cliente = await Cliente.findByPk(cliente_id);
      const refeicao = await Refeicao.findOne({ where: {nome} });
      if (!cliente || !refeicao ){
        return res.status(400).json({error: 'cliente ou tipo de refeicao nao encontrado.'});
      }
      await cliente.addRefeicoes(refeicao);
      return res.json(cliente);
    } catch (err) {
      console.log(err)
      return res.status(500).json({error: err});
    }
  },

}