import fastify from 'fastify'
import multipart from '@fastify/multipart'
import { notification } from './infra/notification'

const app = fastify()

app.register(multipart)

app.register(notification, {
    prefix: '/notification',
})

app.listen({
    port: 3338,
    host: '0.0.0.0'
}).then(() => {
    console.log(`Server running in localhost:${3338}`)
})