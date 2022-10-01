import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(connection) {
    super.init({
      nome: DataTypes.STRING,
      matricula: DataTypes.STRING,
      cpf: DataTypes.STRING,
    }, {
      sequelize: connection
    });
  }
}


export default User;