const sequelize = require('../database');
const Cliente = require('../models/Cliente');
const fs = require('fs');
const { parse } = require('csv-parse');


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
      const { file } = req;
      const isInvalid = validateFile(file, res);
      if (isInvalid) { return; }

      const couldNotUpdate = [];

      fs.createReadStream(file.path).pipe(parse({columns: true}, async (err, records) => {
        if (!records || (records.length > 0 && !validateFields(records[0]))) { 
          res.status(500).json({error: 'O nome de alguma coluna está fora do padrao.'});
          return;
        }

        const clientes = records.filter(cliente => {
          if (!isClienteValid(cliente)) {
            couldNotUpdate.push(cliente);
            return false;
          }
          return true;
        });

        fs.unlink(file.path,(err) => {if (err) { console.error(err)}});
        
        await Cliente.bulkCreate(clientes, {
          updateOnDuplicate: ['nome', 'ativo', 'qtd_refeicoes_gratis'],
        });
        
        // response will have all the raw attributes mentioned in RETURNING clause
        // const upsertedTableResponse = await bulkUpsertIntoTable(clientes);
        // console.log(upsertedTableResponse);

        res.status(200).json({message: 'ok'});
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


function isClienteValid(cliente) {
  const { cpf, qtd_refeicoes_gratis, ativo } = cliente;
  const cpf_regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}$/;
  const isPositive = !isNaN(qtd_refeicoes_gratis) && parseInt(qtd_refeicoes_gratis) >= 0;
  const isBool = !isNaN(ativo) && (ativo == 0 || ativo == 1);
  return cpf.match(cpf_regex) && isPositive && isBool;
}

const bulkUpsertIntoTable = async (clientes) => {
  try {
/* 
INSERT INTO "clientes" ("cliente_id","nome","matricula","cpf","qtd_refeicoes_gratis","ativo","created_at","updated_at") 
VALUES (uuid_generate_v4(),'jose silva','
11111114','11111111114','1','1','2022-10-23 05:36:32.142 +00:00','2022-10-23 05:36:32.142 +00:00'),(uuid_generate_v4(),'jose santos','11111115','11111111115','2','1','20
22-10-23 05:36:32.142 +00:00','2022-10-23 05:36:32.142 +00:00'),(uuid_generate_v4(),'jose lima','11111116','11111111116','0','0','2022-10-23 05:36:32.142 +00:00','2022-1
0-23 05:36:32.142 +00:00') ON CONFLICT ("cliente_id") DO UPDATE SET "nome"=EXCLUDED."nome","qtd_refeicoes_gratis"=EXCLUDED."qtd_refeicoes_gratis","ativo"=EXCLUDED."ativo
" RETURNING "cliente_id","nome","matricula","cpf","qtd_refeicoes_gratis","ativo","created_at","updated_at";`
*/
    let values = '';
    let c;
    for (let i = 0; i < clientes.length; i++) {
      c = clientes[i];
      console.log(c);
      values += `(uuid_generate_v4(),'${c.nome}','${c.matricula}','${c.cpf}','${c.qtd_refeicoes_gratis}','${c.ativo}',`+
      `'${(new Date()).toISOString()}','${(new Date()).toISOString()}')`;
      if (i < clientes.length-1) {
        values += ',';
      }
    }

   const query = 'INSERT INTO "clientes" ("cliente_id","nome","matricula","cpf","qtd_refeicoes_gratis","ativo","created_at","updated_at") '+
   `VALUES ${values}` + ' ON CONFLICT ("cliente_id", "matricula", "cpf") DO UPDATE SET "nome"=EXCLUDED."nome","qtd_refeicoes_gratis"=EXCLUDED."qtd_refeicoes_gratis","ativo"=EXCLUDED."ativo'+
   '" RETURNING "cliente_id","nome","matricula","cpf","qtd_refeicoes_gratis","ativo","created_at","updated_at";'

    return await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
  } catch (error) {
    console.error("Bulk Upserting into Table:", error);
    throw error;
  }
};