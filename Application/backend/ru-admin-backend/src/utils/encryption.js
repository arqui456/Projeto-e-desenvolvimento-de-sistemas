
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

module.exports = {
  async encryptPassword(password){
    const saltRounds = 12; 
    return bcrypt.hash(password, saltRounds);
  }
  
}