const { Op } = require("sequelize");

const filterWithJustStart = (startDate) => {
  return ({
    where: {
      createdAt: {
        [Op.gte]: new Date(startDate),
      }
    },
    ...association,
  });
}

const filterWithJustEnd = (endDate) => {
  return ({
    where: {
      createdAt: {
        [Op.lte]: endDate,
      }
    },
    ...association,
  });
}

const filterWithStartEnd = (startDate, endDate) => {
  return ({
    where: {
      createdAt: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      }
    },
    ...association
  });
}

const association = {
  include: [{
    association: 'clienteInfo',
    attributes: ['nome', 'matricula', 'cpf'],
  }, {
    association: 'refeicaoInfo',
    attributes: ['nome'],
  }]
}



module.exports = {
    filterWithJustStart, filterWithJustEnd, filterWithStartEnd, association
  }