import { Notification } from '../../src/application/entities/notification';
import { NotificationRepository } from '../../src/application/repositories/notification-repositories';

export class InMomeryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
