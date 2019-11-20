import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Game from '../app/models/Game';
import Player from '../app/models/Player';
import Meetup from '../app/models/Meetup';
import MeetupPlayer from '../app/models/MeetupPlayer';

const models = [Game, Player, Meetup, MeetupPlayer];
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
