const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  async login(req, res) {
    try {
      const { username, senha } = req.body;
      if (!(username && senha)) {
        return res.status(401).json({error: 'Nome de usuario ou senha faltando.'});
      }
      const user = await Usuario.findOne({where: {username}});
      if (user) {
        const result = await bcrypt.compare(senha, user.senha);
        if (!result) {
          return res.status(401).json({error: 'Nome de usuario ou senha invalidos.'});
        }
      }
      const token = jwt.sign(
        {usuario_id: user.usuario_id},
        process.env.SECRET_KEY,
        {expiresIn: 3600}
      );
      res.json({auth: true, token});
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao fazer a autenticacao.'});
    }
  }
}