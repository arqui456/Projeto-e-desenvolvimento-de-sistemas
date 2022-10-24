// refeicoes = await ClienteRefeicao.findAll({
//   include: [{association: 'clienteInfo', attributes: ['cpf']}],
//   attributes: [
//     [sequelize.fn("COUNT", sequelize.col("refeicao_id")), "count_refeicao_id"]
//   ], 
//   group: ['clienteInfo.cliente_id', 'cpf'],
// }); , group: [sequelize.fn('date_trunc', 'day', sequelize.col('created_at'))]

const sequelize = require("sequelize");
const Cliente = require("../models/Cliente");
const ClienteRefeicao = require("../models/ClienteRefeicao");
const Refeicao = require("../models/Refeicao");
const { JANTAR, ALMOCO } = require("../utils/constants");
const ObjectsToCsv = require('objects-to-csv');
const csvStringify = require('csv-stringify');
const fs = require('fs');


module.exports = {
  async getPorAluno(req, res) {
    try {
      const { startDate, endDate } = req.query;
    
      if (!(startDate && endDate)) { return res.status(400).end(); }
      const refeicoesTotaisPorAluno = await getRefTodosAlunos(startDate, endDate);
      const clientes = {};
      refeicoesTotaisPorAluno.map(cliente => {
        clientes[cliente.cpf] = [cliente.dataValues.cpf, cliente.dataValues.count_refeicao, "0", "0"];
      });
      const porAlunoJantar = await getRefByTipo(startDate, endDate, JANTAR);
      porAlunoJantar.map(cliente => {
        clientes[cliente.cpf][3] = cliente.dataValues.count_refeicao;
      });
      const porAlunoAlmoco = await getRefByTipo(startDate, endDate, ALMOCO);
      porAlunoAlmoco.map(cliente => {
        clientes[cliente.cpf][2] = cliente.dataValues.count_refeicao;
      });

      let values = Object.values(clientes);
      values = [['cpf', 'total', 'almoco', 'jantar'], ...values];
      const csv = new ObjectsToCsv(values);
      await csv.toDisk('./uploads/relatorio.csv');

      res.download('./uploads/relatorio.csv', 'relatorio.csv', (err) => {
        if (err) {
          res.status(500).send({error: "O arquivo nao pode ser baixado."});
        }
        });
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: 'Ocorreu um erro ao criar o relatorio'});
    }
  },
}

// async function getRefeicoesTotaisPorAluno(startDate, endDate) {
//   return await ClienteRefeicao.findAll({
//     where: {
//       createdAt: {
//         [sequelize.Op.gte]: startDate,
//         [sequelize.Op.lte]: endDate,
//       }
//     },
//     include: [{association: 'clienteInfo', attributes: ['cpf']}],
//     attributes: [
//       [sequelize.fn("COUNT", sequelize.col("refeicao_id")), "count_refeicao_id"]
//     ], 
//     group: ['clienteInfo.cliente_id', 'cpf'],
//   });
// }

// async function getRefeicoesPorAlunoPorTipo(startDate, endDate, tipo) {
//   return await ClienteRefeicao.findAll({
//     where: {
//       createdAt: {
//         [sequelize.Op.gte]: startDate,
//         [sequelize.Op.lte]: endDate,
//       },
//     },
//     include: [{association: 'clienteInfo', attributes: ['cpf']}, {association: 'refeicaoInfo', attributes: ['nome'], where: {nome: tipo}}],
//     attributes: [
//       [sequelize.fn("COUNT", sequelize.col("ClienteRefeicao.refeicao_id")), "count_refeicao_id"]
//     ], 
//     group: ['clienteInfo.cliente_id', 'cpf', 'refeicaoInfo.nome', 'refeicaoInfo.refeicao_id'],
//   });
// }

async function getRefTodosAlunos(startDate, endDate) {
  return await Cliente.findAll({
    where: {
      createdAt: {
        [sequelize.Op.gte]: startDate,
        [sequelize.Op.lte]: endDate,
      },
    },
    attributes: ['cpf',
      [sequelize.fn("COUNT", sequelize.col("refeicoes.refeicao_id")), "count_refeicao"]
    ],
    include: [{model: ClienteRefeicao, as: 'refeicoes', attributes: [],}],
    group: ['Cliente.cliente_id',],
  });
}

async function getRefByTipo(startDate, endDate, tipo) {
  const {refeicao_id} = await Refeicao.findOne({where: {nome: tipo}});
  return await Cliente.findAll({
    where: {
      createdAt: {
        [sequelize.Op.gte]: startDate,
        [sequelize.Op.lte]: endDate,
      },
    },
    attributes: ['cpf',
      [sequelize.fn("COUNT", sequelize.col("refeicoes.refeicao_id")), "count_refeicao"]
    ],
    include: [{model: ClienteRefeicao, as: 'refeicoes', attributes: [], where: {refeicao_id}}],
    group: ['Cliente.cliente_id',],
  });
}