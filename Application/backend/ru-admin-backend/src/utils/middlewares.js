const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

module.exports = {
  verifyJWT(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) { return res.status(401).end(); }

    const [bearer, hash] = token.split(' ');
    jwt.verify(hash, process.env.SECRET_KEY, (err, encoded) => {
      if (err) { return res.status(401).end(); }
      req.usuario_id = encoded.usuario_id;
      next();
    });
  },

  async onlySuperUser(req, res, next) {
    try {
      const user = await Usuario.findByPk(req.usuario_id);
      if (!user) { return res.status(400).json({error: 'Usuario nao encontrado.'}); }
      if (!user.super_user) { return res.status(401).end(); }
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao fazer a autenticacao.'});
    }
  }
}