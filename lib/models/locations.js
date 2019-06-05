'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'locations',
  serialize: function () {
    return {
      id: this.get('id'),
      city: this.get('city'),
      state: this.get('state'),
      object: 'location'
    };
  }
});
