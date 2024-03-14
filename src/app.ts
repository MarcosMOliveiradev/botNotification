import fastify from 'fastify'
import multipart from '@fastify/multipart'
import { notification } from './infra/notification'
import { conectDiscord } from './application/useCase/notificationDiscord'

const app = fastify()

app.register(multipart)

app.register(notification, {
    prefix: '/notification',
})

// app.register(conectDiscord) TODO: reativar quando a api estiver pronta

app.listen({
    port: 3338,
    host: '0.0.0.0'
}).then(() => {
    console.log(`Server running in localhost:${3338}`)
})