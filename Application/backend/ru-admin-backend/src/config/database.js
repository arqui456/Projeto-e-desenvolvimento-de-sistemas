require('dotenv').config()

module.exports = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      required: true,
      rejectUnauthorized: false,
    }
  },
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWD,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
  },
};