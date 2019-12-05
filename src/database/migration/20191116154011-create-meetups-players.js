
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meetups-players', {
      meetupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'meetups',
          key: 'id',
        },
      },
      playerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'players',
          key: 'id',
        },
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
    return queryInterface.dropTable('meetups-players');
  },
};
