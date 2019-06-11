'use strict';

exports.up = (Knex) => {
  return Knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.text('city').notNullable();
    table.text('state').notNullable();
    table.index(['city', 'state'], 'idx_city_state');
  });
};

exports.down = (Knex) => {
  return Knex.schema.dropTable('location');
};
