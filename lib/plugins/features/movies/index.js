'use strict';

const Controller             = require('./controller');
const AddLocationsValidator  = require('../../../validators/location');
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
    },
    {
      method: 'POST',
      path: '/movies/{id}/locations',
      config: {
        handler: (request, reply) => {
          reply(Controller.addLocationsToMovies(request.payload, request.params.id));
        },
        validate: {
          payload: AddLocationsValidator
        }
      }
    }
  ]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
