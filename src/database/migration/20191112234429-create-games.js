module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('games', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('games');
  },
};
