const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {
  static init(connection) {
    super.init({
      cliente_id: {
        primaryKey: true, 
        type:DataTypes.UUID,
      },
      nome: DataTypes.STRING,
      matricula: DataTypes.STRING,
      cpf: DataTypes.STRING,
      qtd_refeicoes_gratis: DataTypes.INTEGER,
      ativo: DataTypes.BOOLEAN,
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
      as: 'refeicoes',
      // constraints: true,
    });
  }
}



module.exports = Cliente;