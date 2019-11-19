import Sequelize, { Model } from 'sequelize';
class MeetupPlayer extends Model {
  static init(sequelize) {
    super.init(
      {
        meetupId: Sequelize.INTEGER,
        gameId: Sequelize.INTEGER,

      },
      {
        sequelize,
      }
    );
  }
}

export default MeetupPlayer;
