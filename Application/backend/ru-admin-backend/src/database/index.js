import Sequelize from 'sequelize';
import dbConfig from '../config/database';

const connection = new Sequelize(dbConfig);

export default connection;