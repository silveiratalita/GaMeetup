import Sequelize, { DataTypes, Model } from 'sequelize';
import Game from './Game';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
        gameId: Sequelize.INTEGER,
        name: Sequelize.STRING,
        isCanceled: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    Meetup.belongsTo(Game, { foreignKey: 'id' });
  }
}

export default Meetup;
