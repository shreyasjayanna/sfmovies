'use strict';

const Knex = require('../../../../lib/libraries/knex');

const Movies = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('retrieve movies', () => {

    it('retrieve all movies', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result).to.be.an('array');
      });
    });

    it('retrieve movies by name', () => {
      const title = 'Twi';

      return Movies.inject({
        url: `/movies?title=${title}`,
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result).to.be.an('array');

        for (const idx in response.result) {
          expect(response.result[idx].title).to.include(title);
        }
      });
    });

    it('retrieve movies by year', () => {
      const year = 2000;

      Knex('movies').insert([
        {
          title: 'Twisted',
          release_year: year
        },
        {
          title: 'Never Die Twice',
          release_year: year
        }
      ]);

      return Movies.inject({
        url: `/movies?year=${year}`,
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result).to.be.an('array');

        for (const idx in response.result) {
          expect(response.result[idx].release_year).to.eql(year);
        }
      });
    });

    it('retrieve movies within a range of years', () => {
      const year_from = 2000;
      const year_to = 2002;

      return Movies.inject({
        url: `/movies?year_from=${year_from}&year_to=${year_to}`,
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result).to.be.an('array');

        for (const idx in response.result) {
          expect(response.result[idx].release_year).to.greaterThan(year_from - 1);
          expect(response.result[idx].release_year).to.lessThan(year_to + 1);
        }
      });
    });

  });

  describe('add locations to movie', () => {

    it('retrieve movies by name', () => {
      const title = 'Twi';

      return Movies.inject({
        url: `/movies?title=${title}`,
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result).to.be.an('array');

        return response.result[0].id;
      })
      .then((id) => {
        return Movies.inject({
          url: `/movies/${id}/locations`,
          method: 'POST',
          payload: {
            city: 'San Francisco',
            state: 'California'
          }
        }).then((response) => {
          expect(response.statusCode).to.eql(200);

          const result = JSON.parse(response.payload);

          expect(result.id).to.eql(id);
          expect(result.locations).to.be.an('array');

          const location = result.locations[0];
          expect(location.city).to.eql('San Francisco');
          expect(location.state).to.eql('California');
        });
      });
    });

  });

});
