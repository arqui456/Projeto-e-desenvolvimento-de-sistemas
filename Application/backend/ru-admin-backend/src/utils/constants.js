require('dotenv').config();

const LIMIT_ALMOCO = new Date()
LIMIT_ALMOCO.setHours(15, 0, 0, 0);

module.exports = {
  LIMIT_ALMOCO,
  ALMOCO: 'almoco',
  JANTAR: 'jantar',
  ITEMS_PER_PAGE: parseInt(process.env.LIMIT_NUM_CLIENTE_PER_QUERY) || 100,
}