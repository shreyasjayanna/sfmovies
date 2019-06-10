'use strict';

const Locations = require('../../lib/models/location');

describe('locations model', () => {

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      const location = Locations.forge().serialize();

      expect(location).to.have.all.keys([
        'id',
        'city',
        'state',
        'object'
      ]);
    });

  });

});
