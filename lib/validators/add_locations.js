'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  city: Joi.string().min(1).max(255).required(),
  state: Joi.string().min(1).max(255).required()
});
