import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_meals', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').references('users.id').notNullable()
    table.uuid('meal_id').references('id').inTable('meals').notNullable()
    table.time('created_at').notNullable().defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_meals')
}

// https://stackoverflow.com/questions/61092854/how-to-query-many-to-many-relations-with-knex-js

/**
const coursesOfSingleStudent = await knex('courses').whereIn('id',
   knex('student_courses').select('course_id').where('student_id', studentId)
)
**/

// Though you might be better off using objection.js which allows you to declare relation mappings and then query directly:

/**
const studentWithCourses = await Student.query().findById(studentId).withGraphFetched('courses');
**/
