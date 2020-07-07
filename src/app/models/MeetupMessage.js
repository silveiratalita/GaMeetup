import Sequelize, { Model, DataTypes } from 'sequelize';

import Meetup from './Meetup';
import Player from './Player';

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
          primaryKey: false,
        },
        playerId: {
          type: Sequelize.INTEGER,
          primaryKey: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'meetup-messages',
      }
    );
    MeetupMessage.belongsTo(Meetup, { foreignKey: 'id' });
    MeetupMessage.belongsTo(Player, { foreignKey: 'id' });
  }
}
export default MeetupMessage;
