import type { Knex } from 'knex';
import { ReviewTargetType } from '../../enums/review';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ratings', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.uuid('target_id').notNullable();
    table
      .enu('target_type', [ReviewTargetType.DISH, ReviewTargetType.RESTAURANT])
      .notNullable();
    table.integer('rating').notNullable().checkBetween([1, 5]);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'target_id', 'target_type']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ratings');
}