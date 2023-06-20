import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middleware/check-session-id-exists'

export async function usersRoutes(app: FastifyInstance) {
  // app.addHook('preHandler', checkSessionIdExists)
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      console.log('sessionId', sessionId)
      const users = await knex('users').where('session_id', sessionId).select()
      return { users }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = z.object({ id: z.string().uuid() }).parse(request.params)
      const { sessionId } = request.cookies

      const user = await knex('users')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return user || reply.status(404).send({ error: 'Invalid ID' })
    },
  )

  app.post('/', async (request, reply) => {
    const { name, email, password } = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
      .parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      const sevenDays = 7 * 24 * 60 * 60 * 1000
      sessionId = randomUUID()
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: sevenDays,
      })
    }

    console.log(sessionId)

    console.log('sessionId', sessionId)

    const user = await knex('users')
      .insert({
        id: randomUUID(),
        session_id: sessionId,
        name,
        email,
        password,
      })
      .returning('*')

    return { user }
  })

  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = z.object({ id: z.string().uuid() }).parse(request.params)

      const user = await knex('users').where({ id }).delete().returning('*')

      if (!user) {
        return reply.status(404).send({ error: 'Invalid ID' })
      } else {
        return reply.status(204).send()
      }
    },
  )
}
