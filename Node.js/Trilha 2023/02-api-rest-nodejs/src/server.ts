import fastify from 'fastify'

const app = fastify()

app.get('/hello', async (request, reply) => {
  return 'Hello World'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server is running on port 3333!')
  })
