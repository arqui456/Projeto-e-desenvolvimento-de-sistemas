const Cliente = require('../models/Cliente');
const ClienteRefeicao = require('../models/ClienteRefeicao');
const Refeicao = require('../models/Refeicao');

module.exports = {
  async store(req, res) {
    try {
      const { cliente_id, refeicao_id } = req.body;
      
      const cliente = await Cliente.findByPk(cliente_id);
      const refeicao = await Refeicao.findByPk(refeicao_id);

      if (!cliente || !refeicao) {
        return res.send(400).json({error: 'Cliente ou tipo de refeicao nao encontrado.'});
      }

      const clienteRefeicao = await ClienteRefeicao.create({ cliente_id, refeicao_id });


      return res.status(200).json(clienteRefeicao);
    } catch (err) {
      console.log(err)
      return res.status(500).json({error: err.name});
    }
  }
}