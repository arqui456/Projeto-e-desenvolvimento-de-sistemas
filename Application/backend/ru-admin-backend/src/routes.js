const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'}).single('fileupload');

const ClienteController = require('./controllers/ClienteController');
const RefeicaoController = require('./controllers/RefeicaoController');
const ClienteRefeicaoController = require('./controllers/ClienteRefeicaoController');
const UsuarioController = require('./controllers/UsuarioController');
const { verifyJWT, onlySuperUser } = require('./utils/middlewares');
const RelatorioController = require('./controllers/RelatorioController');
const FuncionarioController = require('./controllers/FuncionarioController');


router.get('/', (req, res) => {
  res.status(200).send('resposta errada ;)');
});

router.post('/user/login', UsuarioController.login);

router.post('/cliente/update', verifyJWT, onlySuperUser, upload, ClienteController.bulkUpsert);//enviar db

router.get('/cliente', verifyJWT, ClienteController.getCliente);

router.post('/cliente', verifyJWT, onlySuperUser, ClienteController.store);//teste

router.get('/refeicao/:cliente_id/registrar-refeicao', verifyJWT, ClienteRefeicaoController.registerMeal);

router.get('/refeicao', verifyJWT, onlySuperUser, ClienteRefeicaoController.getRefeicoes);

router.get('/relatorio/por-aluno', verifyJWT, onlySuperUser, RelatorioController.getPorAluno);

router.get('/relatorio/por-dia', verifyJWT, onlySuperUser, RelatorioController.getPorDia);

router.post('/funcionario/cadastro', verifyJWT, onlySuperUser, FuncionarioController.registerFuncionario);

router.get('/funcionarios', verifyJWT, onlySuperUser, FuncionarioController.getFuncionarios);

router.delete('/funcionario/deletar', verifyJWT, onlySuperUser, FuncionarioController.deletarFuncionario);

module.exports = router;