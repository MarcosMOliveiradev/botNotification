import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { createNotificationUseCase } from '../../application/useCase/CreateNotification'

// Recebe a requisição vinda do front e valida para enviar para o banco
export class CreateNotificationControllers {
    constructor(private createNotification: createNotificationUseCase) {}

    async create( request: FastifyRequest, reply: FastifyReply) {
        const notificationSchema = z.object({
            urlImg: z.string().optional(),
            text: z.string(),
            link: z.string(),
            tipo: z.string(),
        })

        const { urlImg, link, text, tipo } = await notificationSchema.parse(request.body)

        const response = await this.createNotification.save({ urlImg, link, text, tipo })

        return reply.status(201).send(response)
    }
}