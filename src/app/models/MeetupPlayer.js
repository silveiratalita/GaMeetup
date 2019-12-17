import Sequelize, { Model } from 'sequelize';
import Meetup from './Meetup';
import Player from './Player';

class MeetupPlayer extends Model {
  static init(sequelize) {
    super.init(
      {
        meetupId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        playerId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        }
      },
      {
        sequelize,
        modelName: "meetups-players",
      }
    );
    MeetupPlayer.hasOne(Player, { foreignKey: 'id' });
    MeetupPlayer.hasOne(Meetup, { foreignKey: 'id' });
  }
}
export default MeetupPlayer;

