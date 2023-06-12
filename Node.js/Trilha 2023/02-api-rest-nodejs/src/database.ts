import { knex as setupKnuex } from 'knex'

export const knex = setupKnuex({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
})
