import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMomeryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel Notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationRepository = new InMomeryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      recipientId: 'example-recipient-id',
      content: new Content('Você recebeu uma solicitação de amizade'),
      category: 'social',
    });

    await notificationRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].cancelAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationRepository = new InMomeryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(async () => {
      return await cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
