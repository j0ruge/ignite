import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerUseCases } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registrBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(12),
  })

  const { name, email, password } = registrBodySchema.parse(request.body)

  try {
    await registerUseCases({ name, email, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
