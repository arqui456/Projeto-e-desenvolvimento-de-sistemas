

const filterWithJustStart = (startDate) => {
  return ({ 
    where: {
      createdAt: {
        [Op.gte]: startDate,
      }
    },
    indclude: { association: 'clienteInfo'}
  });
}

const filterWithJustEnd = (endDate) => {
  return ({ 
    where: {
      createdAt: {
        [Op.lte]: endDate,
      }
  },
  indclude: { association: 'clienteInfo'}
  });
}

const filterWithStartEnd = (endDate) => {
  return ({ 
    where: {
      createdAt: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      }
   },
   indclude: { association: 'clienteInfo'}
  });
}



module.exports = {
  filterWithJustStart, filterWithJustEnd, filterWithStartEnd
}