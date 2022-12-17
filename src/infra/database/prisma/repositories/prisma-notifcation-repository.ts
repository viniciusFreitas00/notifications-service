import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../application/entities/notification';
import { NotificationRepository } from '../../../../application/repositories/notification-repositories';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        recipientId: notification.recipientId,
        content: notification.content.value,
        category: notification.category,
        reatAt: notification.readAt,
        createdAt: notification.createdAt,
      },
    });
  }
}
