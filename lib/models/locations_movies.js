'use strict';

const Bookshelf = require('../lib/libraries/bookshelf');

const Movie    = require('./movie');
const Location = require('./location');

module.exports = Bookshelf.Model.extend({
  tableName: 'locations_movies',
  movie: function () {
    return this.hasOne(Movie);
  },
  location: function () {
    return this.hasOne(Location);
  },
  serialize: function () {
    return {
      id: this.get('id'),
      location_id: this.get('location_id'),
      movie_id: this.get('movie_id'),
      object: 'locations_movies'
    };
  }
});
