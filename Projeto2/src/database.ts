import { knex as setupKnex } from 'knex'

export const knex = setupKnex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'node-course-projeto-2',
  },
})
