import Sequelize, { Model } from 'sequelize';
import Game from './Game';
class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        gameId: Sequelize.INTEGER,
        name: Sequelize.STRING,
        isCanceled: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    Meetup.belongsTo(Game);
  }
}

export default Meetup;
