import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    // table.uuid('user_id').references('users.id').notNullable()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.time('meal_hour').notNullable()
    table.boolean('in_diet').notNullable().defaultTo(true)
    table.time('created_at').notNullable().defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
