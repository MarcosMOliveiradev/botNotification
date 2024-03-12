import { Notification } from "../../application/entites/notification";
import { NotificationRepository } from "../../application/repositories/notificationsRepository";
import { prisma } from "../prisma";

export class PrismaNotificationRepository implements NotificationRepository {
    async putch(id: string, data: boolean): Promise<void> {
        await prisma.notification.update({
            where: {
                id,
            },
            data: {
                check: data
            }
        })
    }
    async findAll(): Promise<Notification[]> {
        const notification = await prisma.notification.findMany({
            where: {
                check: false,
            },
            orderBy: {
                createAt: "asc"
            }
        })

        return notification
    }
    async create(notification: Notification): Promise<Notification> {
        const save = await prisma.notification.create({
            data: {
                id: notification.id,
                link: notification.link,
                text: notification.text,
                urlImg: notification.urlImg,
                tipo: notification.tipo,
                check: notification.check,
                createAt: notification.createAt
            },
        });
        return save
    }
    
}