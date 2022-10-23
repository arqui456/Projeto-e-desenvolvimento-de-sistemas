const { Model, DataTypes, fn } = require('sequelize');

class Usuario extends Model {
  static init(connection) {
    super.init({
      usuario_id: {
        primaryKey: true, 
        type: DataTypes.UUID,
        defaultValue: fn('uuid_generate_v4'),
      },
      nome: DataTypes.STRING,
      username: DataTypes.STRING,
      senha: DataTypes.STRING,
      super_user: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize: connection,
      tableName: 'users'
    }); 
  }
}



module.exports = Usuario;