import { app } from './app'
import { env } from './env'

app
  .listen({
    host: env.DATABASE_URL,
    port: env.PORT,
  })
  .then(() => console.log('🚀 HTTP Server is running!'))
