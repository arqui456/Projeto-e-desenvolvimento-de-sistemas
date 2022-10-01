module.exports = {
  dialect: 'postgres',
  host: '172.17.0.3',
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'suru-db',
  define: {
    timestamps: true,
    underscored: true,
  },
};