require('dotenv').config();

const LIMIT_ALMOCO = new Date()
LIMIT_ALMOCO.setHours(11, 0, 0, 0);

const INITIAL_DATE = new Date();
INITIAL_DATE.setFullYear(2015, 1, 1);

module.exports = {
  LIMIT_ALMOCO,
  INITIAL_DATE,
  ALMOCO: 'almoco',
  JANTAR: 'jantar',
  ITEMS_PER_PAGE: parseInt(process.env.LIMIT_NUM_CLIENTE_PER_QUERY) || 100,
}