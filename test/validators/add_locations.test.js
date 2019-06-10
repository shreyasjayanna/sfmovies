'use strict';

const Joi = require('joi');

const AddLocationsValidator = require('../../lib/validators/add_locations');

describe('add locations validator', () => {

  describe('city', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, AddLocationsValidator);

      expect(result.error.details[0].path[0]).to.eql('city');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      const payload = { city: 'a'.repeat(260) };
      const result = Joi.validate(payload, AddLocationsValidator);

      expect(result.error.details[0].path[0]).to.eql('city');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('state', () => {

    it('is required', () => {
      const payload = { city: 'a' };
      const result = Joi.validate(payload, AddLocationsValidator);

      expect(result.error.details[0].path[0]).to.eql('state');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      const payload = {
        city: 'a'.repeat(100),
        state: 'a'.repeat(260)
      };
      const result = Joi.validate(payload, AddLocationsValidator);

      expect(result.error.details[0].path[0]).to.eql('state');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

});
