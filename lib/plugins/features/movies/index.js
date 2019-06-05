'use strict';

const Controller             = require('./controller');
const MovieValidator         = require('../../../validators/movie');
const RetrieveQueryValidator = require('../../../validators/retrieve_query');

exports.register = (server, options, next) => {

  server.route([
    {
      method: 'POST',
      path: '/movies',
      config: {
        handler: (request, reply) => {
          reply(Controller.create(request.payload));
        },
        validate: {
          payload: MovieValidator
        }
      }
    },
    {
      method: 'GET',
      path: '/movies',
      config: {
        handler: (request, reply) => {
          reply(Controller.retrieve(request.query));
        },
        validate: {
          query: RetrieveQueryValidator
        }
      }
    }
  ]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
