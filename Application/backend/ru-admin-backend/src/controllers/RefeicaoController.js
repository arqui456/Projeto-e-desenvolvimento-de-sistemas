const Refeicao = require('../models/Refeicao');

module.exports = {
  async store(req, res) {
    try {
      const { nome, valor } = req.body;
      const refeicao = await Refeicao.create({ nome, valor });
      return res.status(200).json(refeicao);
    } catch (err) {
      console.log(err)
      return res.status(500).json({error: err});
    }
  }
}