import { Notification } from "../entites/notification";

export abstract  class NotificationRepository {
    abstract create(notification: Notification): Promise<Notification>
}