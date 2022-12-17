import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repositories';

export class InMomeryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
