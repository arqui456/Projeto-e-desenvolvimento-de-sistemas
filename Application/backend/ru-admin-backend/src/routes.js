const express = require('express');
const router = express.Router();

const UserController = require('./controllers/ClienteController');
const RefeicaoController = require('./controllers/RefeicaoController');
const ClienteRefeicaoController = require('./controllers/ClienteRefeicaoController');


router.get('/', (req, res) => {
  res.status(200).send('hello world');
});

router.post('/cliente', UserController.store);

router.post('/tipo_refeicao', RefeicaoController.store);

router.post('/refeicao', ClienteRefeicaoController.store);

module.exports = router;