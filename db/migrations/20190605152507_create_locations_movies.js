'use strict';

exports.up = (Knex) => {
  return Knex.schema.createTable('locations_movies', (table) => {
    table.increments('id').primary();
    table.integer('location_id').notNullable().references('locations.id').onDelete('CASCADE');
    table.integer('movie_id').notNullable().references('movies.id').onDelete('CASCADE');
  });
};

exports.down = (Knex) => {
  return Knex.schema.dropTable('locations_movies');
};
