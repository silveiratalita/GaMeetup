import Sequelize, { Model } from 'sequelize';
import Meetup from './MeetUp';
import Player from './Player';

class MeetupPlayer extends Model {
  static init(sequelize) {
    super.init(
      {
        meetupId: Sequelize.INTEGER,
        playerId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    MeetupPlayer.hasOne(Player, { foreignKey: 'id' });
    MeetupPlayer.hasOne(Meetup, { foreignKey: 'id' });
  }
}
export default MeetupPlayer;

