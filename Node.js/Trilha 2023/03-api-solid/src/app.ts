import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify({ logger: true })

app.post('/users', async (request, reply) => {
  const registrBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(12),
  })

  const { name, email, password } = registrBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return reply.status(201).send()
})
