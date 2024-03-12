import { Notification } from "../entites/notification"
import { NotificationRepository } from "../repositories/notificationsRepository"

interface ICreateNotification {
    urlImg?: string
    text: string
    link: string
    tipo: string
}

export class createNotificationUseCase {
    constructor(private notificatioRepositri: NotificationRepository) {}

    async save(request: ICreateNotification) {
        const { urlImg, link, text, tipo } = request

        const notification = new Notification({
            urlImg,
            link,
            text,
            tipo,
        })

        const response = await this.notificatioRepositri.create(notification)

        return response
    }
}