// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      session_id?: string
      name: string
      email: string
      password: string
      created_at: string
    }
    meals: {
      id: string
      name: string
      description: string
      meal_hour: string
      in_diet: boolean
      created_at: string
    }
  }
}
