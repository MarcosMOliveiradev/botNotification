import fastify from 'fastify'
import multipart from '@fastify/multipart'

const app = fastify()

app.register(multipart)

app.listen({
    port: 3339,
    host: '0.0.0.0'
}).then(() => {
    console.log(`Server running in localhost:${3339}`)
})