import { app } from './app'
import { env } from './env'

app
  .listen({
    host: env.APP_HOST,
    port: env.PORT,
  })
  .then(() => console.log('🚀 HTTP Server is running!'))
