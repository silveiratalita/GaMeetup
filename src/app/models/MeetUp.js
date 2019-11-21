import Sequelize, { Model } from 'sequelize';
import Game from './Game';
class MeetUp extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        gameId: Sequelize.INTEGER,
        name: Sequelize.STRING,
        isCanceled: Sequelize.BOOLEAN,
      },
      {
        sequelize, modelName:'meetup'
      }
    );
    MeetUp.belongsTo(Game);
  }
}

export default MeetUp;
