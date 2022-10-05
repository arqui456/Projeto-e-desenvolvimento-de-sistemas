const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Cliente = require('../models/Cliente');
const Refeicao = require('../models/Refeicao');
const ClienteRefeicao = require('../models/ClienteRefeicao');

const connection = new Sequelize(dbConfig);

Cliente.init(connection);
Refeicao.init(connection);
ClienteRefeicao.init(connection);

Cliente.associate(connection.models);
Refeicao.associate(connection.models);
ClienteRefeicao.associate(connection.models);

module.exports = connection;