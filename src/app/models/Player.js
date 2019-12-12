import Sequelize,  { Model } from 'sequelize';
class Player extends Model{
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      cellphone:Sequelize.STRING,
    },
    {
      sequelize,
    }
    );

  }
}

export default Player;
