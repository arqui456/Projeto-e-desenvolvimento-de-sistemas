const sqlz = require("sequelize");
const Cliente = require('../models/Cliente');
const fs = require('fs');
const { parse } = require('csv-parse');
const dateTime = require('date-and-time');


module.exports = {
  async store(req, res) {
    try {
      const { nome, matricula, cpf, qtd_refeicoes_gratis, ativo } = req.body;
      const cliente = await Cliente.create({ nome, matricula, cpf, qtd_refeicoes_gratis, ativo});
      return res.status(200).json(cliente);
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao salvar o cliente.'});
    }
  },

  async getCliente(req, res) {
    try {
      const { cpf, matricula } = req.query;

      let todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      dateTime.addHours(todayDate, -3);

      let cliente;
      if (cpf) {
        cliente = await Cliente.findOne({ 
          where: { cpf }, 
          include: {
            association: 'refeicoes',
            where: {
              createdAt: {
                [sqlz.Op.gte]: todayDate,
              }
            }
          }
        });
      } else if (matricula) {
        cliente = await Cliente.findOne({ 
          where: { matricula },
          include: {
            association: 'refeicoes',
            where: {
              createdAt: {
                [sqlz.Op.gte]: todayDate,
              }
            }
          }
        });
      } else {
        return res.status(400).json({error: 'CPF ou matricula necessarios para realizar a consulta.'});
      }

      if (!cliente){
        return res.status(400).json({error: 'cliente nao encontrado.'});
      }
      return res.status(200).json(cliente);
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro o recuperar as informacoes do cliente.'});
    }
  },

  async bulkUpsert(req, res) {
    try {
      const { file } = req;
      const isInvalid = validateFile(file, res);
      if (isInvalid) { return; }

      
      fs.createReadStream(file.path).pipe(parse({columns: true}, async (err, records) => {
        if (!records || (records.length > 0 && !validateFields(records[0]))) { 
          res.status(500).json({error: 'O nome de alguma coluna está fora do padrao.'});
          return;
        }
        const {valid, invalid} = getValidClients(records);
        
        fs.unlink(file.path,(err) => {if (err) { console.error(err)}});
        
        await Cliente.bulkCreate(valid, {
          updateOnDuplicate: ['nome', 'ativo', 'qtd_refeicoes_gratis'],
        });
        
        res.status(200).json({couldNotUpdate: invalid});
      }));
      
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao atualizar as informacoes dos clientes.'});
    }
  }
}


function validateFile(file, res) {
  if (!file) { 
    return res.status(415).json({error: 'Um arquivo csv eh esperado.'});
  }
  if (file.mimetype != 'text/csv') { 
    return res.status(415).json({error: 'O arquivo enviado deve ser um csv.'});
  }
  return null;
}


function validateFields(cliente) {
  const { nome, matricula, cpf, qtd_refeicoes_gratis, ativo } = cliente;
  return nome && matricula && cpf && qtd_refeicoes_gratis && ativo;
}


function getValidClients(clientes) {
  const invalid = [];
  const valid = clientes.filter(cliente => {
    if (!isClienteValid(cliente)) {
      invalid.push(cliente);
      return false;
    }
    return true;
  });
  return {valid, invalid};
}


function isClienteValid(cliente) {
  const { cpf, qtd_refeicoes_gratis, ativo } = cliente;
  const cpf_regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}$/;
  const isPositive = !isNaN(qtd_refeicoes_gratis) && parseInt(qtd_refeicoes_gratis) >= 0;
  const isBool = !isNaN(ativo) && (ativo == 0 || ativo == 1);
  return cpf.match(cpf_regex) && isPositive && isBool;
}