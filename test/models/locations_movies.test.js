'use strict';

const LocationsMovies = require('../../lib/models/locations_movies');

describe('locations_movies model', () => {

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      const locationModels = LocationsMovies.forge().serialize();

      expect(locationModels).to.have.all.keys([
        'id',
        'location_id',
        'movie_id',
        'object'
      ]);

    });

  });

});
