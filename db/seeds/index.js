'use strict';

const Movies    = require('./data/movies');
const Locations = require('./data/locations');

exports.seed = async (Knex) => {
  await Knex.raw('TRUNCATE locations_movies, movies, locations CASCADE');
  await Knex('movies').insert(Movies);
  await Knex('locations').insert(Locations);
};
