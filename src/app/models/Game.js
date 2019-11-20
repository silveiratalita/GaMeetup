import Sequelize, { Model } from 'sequelize';
class Game extends Model {
  static init(sequelize) {
    super.init(
      {
        id:sequelize.INTEGER,
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
