import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repositories';
import { NotificationNotFound } from './errors/notification-not-found';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
    // // const notification = await this.notificationRepository.findById(
    // //   notificationId,
    // // );

    // if (!notification) {
    //   throw new NotificationNotFound();
    // }

    // notification.cancel();

    // this.notificationRepository.save(notification);
  }
}
