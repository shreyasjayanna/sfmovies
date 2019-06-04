'use strict';

const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.retrieve = async (queryParams) => {
  return new Movie().query((qb) => {

    if (queryParams) {
      if (queryParams.year) {
        // Query by a particular year
        qb.where('release_year', '=', queryParams.year);
      }
      if (!queryParams.year) {
        if (queryParams.year_from) {
          // Query by a range of years
          qb.where('release_year', '>=', queryParams.year_from);
        }

        if (queryParams.year_to) {
          // If no end year given, default to 9999 to retrieve all movies from year_start
          qb.where('release_year', '<=', queryParams.year_to);
        }
      }

      if (queryParams.title) {
        // Filter by exact title
        qb.where('title', 'LIKE', `%${queryParams.title}%`);
        qb.orderBy('title');
      } else {
        qb.orderBy('release_year');
      }
    }
  }).fetchAll();
};
