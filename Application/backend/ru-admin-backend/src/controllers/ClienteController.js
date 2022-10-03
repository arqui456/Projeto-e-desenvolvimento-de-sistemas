const Cliente = require('../models/Cliente');

module.exports = {
  async store(req, res) {
    try {
      const { nome, matricula, cpf } = req.body;
      const cliente = await Cliente.create({ nome, matricula, cpf});
      return res.status(200).json(cliente);
    } catch (err) {
      return res.status(500).json({error: err.name});
    }
  }
}