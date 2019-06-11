'use strict';

const Bookshelf = require('../libraries/bookshelf');

const Locations = require('./location');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',
  locations: function () {
    return this.belongsToMany(Locations);
  },
  serialize: function () {
    return {
      id: this.get('id'),
      title: this.get('title'),
      release_year: this.get('release_year'),
      locations: this.related('locations'),
      object: 'movie'
    };
  }
}, {
  RELATED: ['locations']
});
