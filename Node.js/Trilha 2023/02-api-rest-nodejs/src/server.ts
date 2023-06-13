import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'

const app = fastify()

app.get('/inserir', async (request, reply) => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app.get('/select', async (request, reply) => {
  const transaction = await knex('transactions').select('*')
  return transaction
})

app.get('/filter', async (request, reply) => {
  const transaction = await knex('transactions')
    .where('amont', '1000')
    .select('*')
  return transaction
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server is running on port 3333!')
  })
