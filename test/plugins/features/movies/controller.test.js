'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

const Movie = require('../../../../lib/models/movie');

const Knex = require('../../../../lib/libraries/knex');

beforeEach('Setup test DB', async () => {
  await Knex.schema.raw('TRUNCATE TABLE movies, locations, locations_movies CASCADE');
  await Knex('movies').insert([
    {
      name: 'Twisted',
      release_year: 2004
    },
    {
      name: 'Never Die Twice',
      release_year: 2001
    }
  ]);

  await Knex('locations').insert([
    {
      city: 'San Francisco',
      state: 'California'
    }
  ]);
});

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const name = 'WALL-E';
      const payload = { title: name };
      const movie = await Controller.create(payload);

      expect(movie.get('name')).to.eql(name);
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

  describe('add locations to movies', () => {

    it('tries to add location to a non-existent movie', () => {
      const payload = {
        city: 'San Francisco',
        state: 'California'
      };

      const id = 233444; // non-existent movie ID
      Controller.addLocationsToMovies(payload, id).catch((err) => {
        expect(err).to.be.eql(Movie.NotFoundError);
      });

    });

    it('tries to add a non-existent location to a existing movie', async () => {
      const queryParams = { title: 'Twisted' };
      const movies = await Controller.retrieve(queryParams);
      const movieId = movies.at(0).get('id');
      const payload = {
        city: 'non-existent city',
        state: 'non-existent state'
      };
      const movie = await Controller.addLocationsToMovies(payload, movieId);
      expect(movie.related('locations').at(0).get('city')).to.eql('Non-existent City');
      expect(movie.related('locations').at(0).get('state')).to.eql('Non-existent State');
    });

  });

});
