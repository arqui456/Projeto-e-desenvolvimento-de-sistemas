const Cliente = require('../models/Cliente');

module.exports = {
  async store(req, res) {
    try {
      const { nome, matricula, cpf, qtd_refeicoes_gratis } = req.body;
      const cliente = await Cliente.create({ nome, matricula, cpf});
      return res.status(200).json(cliente);
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao salvar o cliente.'});
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
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro o recuperar as informacoes do cliente.'});
    }
  },

  async bulkUpsert(req, res) {
    try {
      const clientes = [];
      Cliente.bulkCreate(clientes, {
        fields: ['ativo', 'qtd_refeicoes_gratis'],
        updateOnDuplicate: ['ativo', 'qtd_refeicoes_gratis']
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao atualizar as informacoes dos clientes.'});
    }
  }
}