import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
// import { checkSessionIdExists } from '../middleware/check-session-id-exists'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const users = await knex('users').select()
    return { users }
  })

  app.get('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params)
    const user = await knex('users').where({ id }).first()

    return user || reply.status(404).send({ error: 'Invalid ID' })
  })

  app.post('/', async (request, reply) => {
    const { name, email, password } = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
      .parse(request.body)

    const user = await knex('users')
      .insert({
        id: randomUUID(),
        name,
        email,
        password,
      })
      .returning('*')

    return { user }
  })

  app.delete('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params)

    const user = await knex('users').where({ id }).delete().returning('*')

    if (!user) {
      return reply.status(404).send({ error: 'Invalid ID' })
    } else {
      return reply.status(204).send()
    }
  })
}
