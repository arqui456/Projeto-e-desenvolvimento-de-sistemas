const { Model, DataTypes, fn } = require('sequelize');
const ClienteRefeicao = require('./ClienteRefeicao');

class Cliente extends Model {
  static init(connection) {
    super.init({
      cliente_id: {
        primaryKey: true, 
        type:DataTypes.UUID,
        defaultValue: fn('uuid_generate_v4'),
      },
      chave_pessoal: {
        type:DataTypes.UUID,
        defaultValue: fn('uuid_generate_v4'),
      },
      nome: DataTypes.STRING,
      matricula: DataTypes.STRING,
      cpf: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: 'clientes'
    });
  }

  static associate(models) {
    Cliente.hasMany(models.ClienteRefeicao, { 
      foreignKey: 'cliente_id', 
      onDelete: 'SET NULL' ,
      onUpdate: 'CASCADE',
      constraints: true,
    });
  }
}



module.exports = Cliente;