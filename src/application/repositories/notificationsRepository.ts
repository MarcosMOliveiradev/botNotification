import { Notification } from "../entites/notification";

export abstract  class NotificationRepository {
    abstract create(notification: Notification): Promise<Notification>
    abstract findAll(): Promise<Notification[]>
    abstract putch(id: string, data: boolean): Promise<void>
}