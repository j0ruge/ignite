import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/inserir', async () => {
    const transaction = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Transação de teste',
        amount: 1000,
      })
      .returning('*')

    return transaction
  })

  app.get('/select', async () => {
    const transaction = await knex('transactions').select('*')
    return transaction
  })

  app.get('/filter', async () => {
    const transaction = await knex('transactions')
      .where('amount', '1000')
      .select('*')
    return transaction
  })
}
