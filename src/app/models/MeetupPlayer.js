import Sequelize, { Model } from 'sequelize';
import Meetup from '../models/Meetup';
import Player from '../models/Player';
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
    // MeetupPlayer.hasMany(Player, { foreignKey: 'id' });
    // MeetupPlayer.hasMany(Meetup, { foreignKey: 'id' });
  }
}

export default MeetupPlayer;
