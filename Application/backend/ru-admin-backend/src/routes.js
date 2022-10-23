const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'}).single('fileupload');

const ClienteController = require('./controllers/ClienteController');
const RefeicaoController = require('./controllers/RefeicaoController');
const ClienteRefeicaoController = require('./controllers/ClienteRefeicaoController');
const UsuarioController = require('./controllers/UsuarioController');
const { verifyJWT, onlySuperUser } = require('./utils/middlewares');


router.get('/', (req, res) => {
  res.status(200).send('hello world');
});

router.post('/user/login', UsuarioController.login);

router.post('/cliente/update', verifyJWT, onlySuperUser, upload, ClienteController.bulkUpsert);

router.get('/cliente', verifyJWT, ClienteController.getCliente);

router.post('/cliente', verifyJWT, onlySuperUser, ClienteController.store);

router.post('/refeicao/:cliente_id/registrar-refeicao', verifyJWT, ClienteRefeicaoController.registerMeal);

router.get('/refeicao', verifyJWT, onlySuperUser, ClienteRefeicaoController.getRefeicoes);

module.exports = router;