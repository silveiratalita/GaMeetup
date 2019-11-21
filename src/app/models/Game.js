import Sequelize, {DataTypes, Model } from 'sequelize';
class Game extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        name: Sequelize.STRING,
        type: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default  Game;
