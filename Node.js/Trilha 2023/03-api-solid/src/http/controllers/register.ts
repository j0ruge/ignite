import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
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
}
