import Sequelize, { Model } from 'sequelize';

class Player extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        cellphone: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Player;
