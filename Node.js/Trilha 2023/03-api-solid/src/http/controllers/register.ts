import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registrBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(12),
  })

  const { name, email, password } = registrBodySchema.parse(request.body)

  try {
    // const usersRepository = new PrismaUsersRepository()
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}