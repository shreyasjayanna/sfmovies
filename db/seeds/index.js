'use strict';

const Movies    = require('./data/movies');
const Locations = require('./data/locations');

exports.seed = (Knex) => {
  return Knex.raw('TRUNCATE locations_movies CASCADE')
  .then(() => {
    const models = ['locations_movies', 'movies', 'locations'];
    return models;
  })
  .mapSeries((tableName) => {
    return Knex.raw(`TRUNCATE ${tableName} CASCADE`);
  })
  .then(async () => {
    await Knex('movies').insert(Movies);
    await Knex('locations').insert(Locations);
    return;
  });
};
