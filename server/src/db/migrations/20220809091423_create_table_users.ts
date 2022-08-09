import { Knex } from 'knex';

/**
 * Migration to create a new table for users.
 * @param {Knex} knex
 */
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('profile_pic_url').notNullable();
  });
}

/**
 * Revert above migration
 * @param {Knex} knex
 */
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
