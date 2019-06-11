'use strict';

const Movie    = require('../../../models/movie');
const Location = require('../../../models/location');

const LOCATION_MODEL_FETCH_OPTIONS = { require: true };
const MOVIE_MODEL_FETCH_OPTIONS    = { withRelated: Movie.RELATED, require: true };

exports.create = async (payload) => {
  // Write to name column in addition to title column for migration purposes.
  payload.name = payload.title
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch(MOVIE_MODEL_FETCH_OPTIONS);
};

exports.retrieve = async (queryParams) => {
  return new Movie().query((qb) => {
    if (!queryParams) {
      return;
    }

    if (queryParams.year) {
      // Query by a particular year
      qb.where('release_year', '=', queryParams.year);
    } else {
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
  }).fetchAll(MOVIE_MODEL_FETCH_OPTIONS);
};

function toTitleCase (str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

exports.addLocationsToMovies = async (payload, movieId) => {
  return new Movie({ id: movieId })
  .fetch(MOVIE_MODEL_FETCH_OPTIONS)
  .catch(Movie.NotFoundError, () => {
    throw Movie.NotFoundError;
  })
  .then(() => {
    const city  = toTitleCase(payload.city);
    const state = toTitleCase(payload.state);

    const locationPayload = { city, state };

    return new Location().query((qb) => {
      qb.where('city', '=', city);
      qb.where('state', '=', state);
    })
    .fetch(LOCATION_MODEL_FETCH_OPTIONS)
    .catch(() => {
      return new Location().save(locationPayload);
    })
    .then((location) => {
      return new Movie({ id: movieId }).locations().attach(location);
    });
  })
  .then(() => {
    return new Movie({ id: movieId }).fetch(MOVIE_MODEL_FETCH_OPTIONS);
  });
};
