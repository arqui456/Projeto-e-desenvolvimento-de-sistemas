const sequelize = require("sequelize");
const Cliente = require("../models/Cliente");
const ClienteRefeicao = require("../models/ClienteRefeicao");
const Refeicao = require("../models/Refeicao");
const { JANTAR, ALMOCO, INITIAL_DATE } = require("../utils/constants");
const ObjectsToCsv = require('objects-to-csv');


module.exports = {
  async getPorAluno(req, res) {
    try {
      let { startDate, endDate } = req.query;
      startDate = startDate || INITIAL_DATE.toISOString();
      endDate = endDate || new Date().toISOString();
      // let aux = startDate
      // startDate = endDate
      // endDate = aux
      if (!(startDate && endDate)) { return res.status(400).end(); }
      console.log(startDate);
      console.log(endDate);
      await writeRelatorio(startDate, endDate);

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


async function writeRelatorio(startDate, endDate) {
  await writeHeader();

  let clientesList;
  clientesList = await queryClienteAndRelatedRefeicoes(startDate, endDate);
  console.log(clientesList);
  let csv = new ObjectsToCsv(clientesList);
  await csv.toDisk('./uploads/relatorio.csv', {append: true});
}

async function writeHeader() {
  const header = [['cpf', 'total', 'almoco', 'jantar'],];
  let csv = new ObjectsToCsv(header);
  await csv.toDisk('./uploads/relatorio.csv');
}

async function queryClienteAndRelatedRefeicoes(startDate, endDate) {
  const refeicoesTotaisPorAluno = await getRefTodosAlunos(startDate, endDate);
  const clientes = {};
  refeicoesTotaisPorAluno.map(cliente => {
    clientes[cliente.cpf] = [cliente.dataValues.cpf, cliente.dataValues.count_refeicao, "0", "0"];
  });
  const porAlunoJantar = await getJantarCount(startDate, endDate);
  porAlunoJantar.map(cliente => {
    clientes[cliente.cpf][3] = cliente.dataValues.count_refeicao;
  });
  const porAlunoAlmoco = await getAlmocoCount(startDate, endDate);
  porAlunoAlmoco.map(cliente => {
    clientes[cliente.cpf][2] = cliente.dataValues.count_refeicao;
  });
  return Object.values(clientes);
}

async function getRefTodosAlunos(startDate, endDate) {
  return await Cliente.findAll({
    attributes: ['cpf',
      [sequelize.fn("COUNT", sequelize.col("refeicoes.refeicao_id")), "count_refeicao"]
    ],
    include: [{model: ClienteRefeicao, as: 'refeicoes', attributes: [],
      where: {
        createdAt: {
          [sequelize.Op.gte]: startDate,
          [sequelize.Op.lte]: endDate,
        },
      },
    }],
    group: ['Cliente.cliente_id',],
    order: [['cpf', 'asc']],
  });
}

async function getJantarCount(startDate, endDate) {
  return await getRefByTipo(startDate, endDate, JANTAR);
}

async function getAlmocoCount(startDate, endDate) {
  return await getRefByTipo(startDate, endDate, ALMOCO);
}

async function getRefByTipo(startDate, endDate, tipo) {
  const {refeicao_id} = await Refeicao.findOne({where: {nome: tipo}});
  return await Cliente.findAll({
    attributes: ['cpf',
      [sequelize.fn("COUNT", sequelize.col("refeicoes.refeicao_id")), "count_refeicao"]
    ],
    include: [{model: ClienteRefeicao, as: 'refeicoes', attributes: [],
      where: {
        refeicao_id,
        createdAt: {
          [sequelize.Op.gte]: startDate,
          [sequelize.Op.lte]: endDate,
        },
      }
    }],
    group: ['Cliente.cliente_id',],
    order: [['cpf', 'asc']],
  });

}