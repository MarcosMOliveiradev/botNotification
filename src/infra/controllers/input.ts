import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ImgControllers } from './ImgControllers'

const img = new ImgControllers()

export class Notification {
    async create( request: FastifyRequest, reply: FastifyReply) {
        const notificationSchema = z.object({
            text: z.string(),
            link: z.string(),
            tipo: z.string(),
        })

        const urlImg = img.upload(request, reply)

        const { link, text, tipo } = await notificationSchema.parse(request.body)
    }
}