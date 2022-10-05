const express = require('express');
const router = express.Router();


const ClienteController = require('./controllers/ClienteController');
const RefeicaoController = require('./controllers/RefeicaoController');
const ClienteRefeicaoController = require('./controllers/ClienteRefeicaoController');


router.get('/', (req, res) => {
  res.status(200).send('hello world');
});

router.get('/cliente', ClienteController.getCliente);

router.post('/cliente', ClienteController.store);

router.post('/cliente/:cliente_id/registrar-refeicao', ClienteController.registerMeal);

router.post('/tipo_refeicao', RefeicaoController.store);

router.get('/refeicao', ClienteRefeicaoController.getRefeicoes);

module.exports = router;