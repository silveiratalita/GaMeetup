import Sequelize,  { Model } from 'sequelize';
class Player extends Model{
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      password_hash: Sequelize.STRING,
    },
    {
      sequelize,
    }
    );

  }
}

export default Player;
