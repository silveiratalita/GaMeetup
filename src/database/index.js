import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Game from '../app/models/Game';
import Player from '../app/models/Player';
import MeetupPlayer from '../app/models/MeetupPlayer';
import Meetup from '../app/models/Meetup';
import MeetupMessage from '../app/models/MeetupMessage';

const models = [Game, Player, Meetup, MeetupPlayer, MeetupMessage];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    return models.map(model => model.init(this.connection));
  }
}

export default new Database();
