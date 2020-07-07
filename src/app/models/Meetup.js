import Sequelize, { DataTypes, Model } from 'sequelize';
import Game from './Game';
import MeetupMessage from './MeetupMessage';

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
        modelName: 'meetup',
      }
    );
    Meetup.belongsTo(Game, { foreignKey: 'id' });
    // Meetup.hasMany(MeetupMessage,{foreignKey:'id',sourceKey:'id'});
  }
}

export default Meetup;
