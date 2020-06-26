import Sequelize, { Model } from 'sequelize';
import Meetup from './Meetup';
import Player from './Player';
import Mail from '../../lib/mail';

class MeetupMessage extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        meetupId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        playerId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        // modelName: 'meetups-players',
      }
    );
    MeetupMessage.belongsTo(Meetup, { foreignKey: 'id' });
    MeetupMessage.belongsTo(Player, { foreignKey: 'id' });
  }
}
export default MeetupMessage;
