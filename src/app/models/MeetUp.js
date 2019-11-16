import Sequelize, { Model } from 'sequelize';
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
        sequelize,
      }
    );
  }
}

export default Player;
