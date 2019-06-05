'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  title: Joi.string().min(1).max(255).optional(),
  year: Joi.number().integer().min(1878).max(9999).optional(),
  year_from: Joi.number().integer().min(1878).max(9999).optional(),
  year_to: Joi.number().integer().min(1878).max(9999).optional()
});
