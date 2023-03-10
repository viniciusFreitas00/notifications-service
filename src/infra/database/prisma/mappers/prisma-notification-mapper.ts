import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      reatAt: notification.readAt,
      createdAt: notification.createdAt,
      cancelAt: notification.cancelAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        recipientId: raw.recipientId,
        content: new Content(raw.content),
        category: raw.category,
        createdAt: raw.createdAt,
        readAt: raw.reatAt,
        cancelAt: raw.cancelAt,
      },
      raw.id,
    );
  }
}
