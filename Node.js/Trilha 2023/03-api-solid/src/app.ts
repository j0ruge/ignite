import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify({ logger: true })

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'John',
    email: 'doe@teste.com',
  },
})
