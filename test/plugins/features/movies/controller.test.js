'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

const Knex = require('../../../../lib/libraries/knex');

const TableMovies          = 'movies';

beforeEach('Setup test DB', async () => {
  await Knex.schema.raw('TRUNCATE TABLE movies, locations_movies CASCADE');
  await Knex(TableMovies).insert([
    {
      title: 'Twisted',
      release_year: 2004
    },
    {
      title: 'Never Die Twice',
      release_year: 2001
    }
  ]);
});

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { title: 'WALL-E' };

      const movie = await Controller.create(payload);

      expect(movie.get('title')).to.eql(payload.title);
    });

  });

  describe('retrieve', () => {

    it('retrieves all movies', async () => {
      const movies = await Controller.retrieve();

      expect(movies.length).to.eql(2);
    });

    it('retrieves movies by title', async () => {
      const queryParams = { title: 'Twi' };
      const movies = await Controller.retrieve(queryParams);

      expect(movies.length).to.eql(2);
    });

    it('retrieves movies by release year', async () => {
      const queryParams = { year: 2004 };
      const movies = await Controller.retrieve(queryParams);

      expect(movies.length).to.eql(1);
      expect(movies.at(0).get('release_year')).to.eql(2004);
    });

    it('retrieves movies by range of release year', async () => {
      const queryParams = {
        year_from: 2000,
        year_to: 2004
      };
      const movies = await Controller.retrieve(queryParams);

      expect(movies.length).to.eql(2);
    });

  });

});
