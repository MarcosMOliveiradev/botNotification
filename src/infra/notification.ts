import { FastifyInstance } from "fastify";
import { PrismaNotificationRepository } from "../database/repositories/prismaNotificationRepositori";
import { createNotificationUseCase } from "../application/useCase/CreateNotification";
import { ImgControllers } from "./controllers/ImgControllers";
import { CreateNotificationControllers } from "./controllers/CreateNotificationController";

// repositorio
const notificationRepository = new PrismaNotificationRepository()

//caso de uso
const notificationUsecase = new createNotificationUseCase(notificationRepository)

// controllre
const notificationControllers = new CreateNotificationControllers(notificationUsecase)
const imgControllers = new ImgControllers()


// rotas da api
export async function notification(app: FastifyInstance) {
    app.post('/img', async (request, reply) => {
        return imgControllers.upload(request, reply)
    })
    
    app.post('/creat', async (request, reply) => {
        return notificationControllers.create(request, reply)
    })
} 
