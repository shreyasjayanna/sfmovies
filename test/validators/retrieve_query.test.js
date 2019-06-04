'use strict';

const Joi = require('joi');

const RetrieveQueryValidator = require('../../lib/validators/retrieve_query');

describe('retrieve query validator', () => {

  describe('title', () => {

    it('is less than 255 characters', () => {
      const queryParams = { title: 'a'.repeat(260) };
      const result = Joi.validate(queryParams, RetrieveQueryValidator);

      expect(result.error.details[0].path[0]).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  const queryParamsList = ['year', 'year_from', 'year_to'];
  for (const idx in queryParamsList) {
    const param = queryParamsList[idx];
    describe(param, () => {

      it('is after 1878', () => {
        const queryParams = {
          [param]: 1800
        };
        const result = Joi.validate(queryParams, RetrieveQueryValidator);

        expect(result.error.details[0].path[0]).to.eql(`${param}`);
        expect(result.error.details[0].type).to.eql('number.min');
      });

      it('is limited to 4 digits', () => {
        const queryParams = {
          [param]: 12345
        };
        const result = Joi.validate(queryParams, RetrieveQueryValidator);

        expect(result.error.details[0].path[0]).to.eql(`${param}`);
        expect(result.error.details[0].type).to.eql('number.max');
      });

    });
  }

});
