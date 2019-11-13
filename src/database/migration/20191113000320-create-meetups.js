module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meetups', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isCanceled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('meetups');
  },
};
