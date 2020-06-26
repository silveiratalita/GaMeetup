module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meetup-messages', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      meetup_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'meetups',
          key: 'id',
        },
        primaryKey: true,
      },
      player_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'players',
          key: 'id',
        },
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('meetup-messages');
  },
};
