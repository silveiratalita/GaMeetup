module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gameetup',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

