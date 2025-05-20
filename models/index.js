const { Sequelize, DataTypes } = require('sequelize');

// Edit your credentials below:
const sequelize = new Sequelize('imdb_', 'root', 'soumya', {
  host: 'localhost',
  dialect: 'mysql',
});

const Actor = require('./actor')(sequelize, DataTypes);
const Producer = require('./producer')(sequelize, DataTypes);
const Movie = require('./movie')(sequelize, DataTypes);

// Many-to-many: Movie <-> Actor
const MovieActor = sequelize.define('MovieActor', {}, { timestamps: false });
Movie.belongsToMany(Actor, { through: MovieActor, foreignKey: 'movie_id' });
Actor.belongsToMany(Movie, { through: MovieActor, foreignKey: 'actor_id' });

// One-to-many: Producer -> Movie
Movie.belongsTo(Producer, { foreignKey: 'producer_id' });
Producer.hasMany(Movie, { foreignKey: 'producer_id' });

module.exports = { sequelize, Actor, Producer, Movie, MovieActor };
