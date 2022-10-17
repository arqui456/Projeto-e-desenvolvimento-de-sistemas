const { Model, DataTypes, fn } = require('sequelize');

class ClienteRefeicao extends Model {
  static init(connection) {
    super.init({
      cliente_refeicao_id: {
        primaryKey: true, 
        type:DataTypes.UUID,
        defaultValue: fn('uuid_generate_v4'),
      },
      cliente_id: DataTypes.UUID,
      refeicao_id: DataTypes.UUID,
    }, {
      sequelize: connection,
      tableName: 'cliente_refeicao'
    });
  }

  static associate(models) {
    this.belongsTo(models.Cliente, {foreignKey: 'cliente_id', as: 'clienteInfo'});
    this.belongsTo(models.Refeicao, {foreignKey: 'refeicao_id', as: 'refeicaoInfo'});
  }
}

module.exports = ClienteRefeicao;