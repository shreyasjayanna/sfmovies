'use strict';

const Movies    = require('./data/movies');
const Locations = require('./data/locations');

exports.seed = (Knex) => {
  return Knex.raw('TRUNCATE locations_movies, movies, locations CASCADE')
  .then(async () => {
    await Knex('movies').insert(Movies);
    await Knex('locations').insert(Locations);
    return;
  });
};
