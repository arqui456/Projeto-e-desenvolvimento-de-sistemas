const { Model, DataTypes, fn } = require('sequelize');

class Refeicao extends Model {
  static init(connection) {
    super.init({
      refeicao_id: {
        primaryKey: true, 
        type: DataTypes.UUID,
        defaultValue: fn('uuid_generate_v4'),
      },
      nome: DataTypes.STRING,
      valor: DataTypes.FLOAT,
    }, {
      sequelize: connection,
      tableName: 'refeicoes'
    });
    
  }

  static associate(models) {
    Refeicao.hasMany(models.ClienteRefeicao, { 
      foreignKey: 'refeicao_id',
      onDelete: 'SET NULL' ,
      onUpdate: 'CASCADE',
      constraints: true,
    })
  }
}



module.exports = Refeicao;