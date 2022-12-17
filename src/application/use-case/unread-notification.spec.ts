import { InMomeryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

describe('Unead notification', () => {
  it('Should be able to unread a notification', async () => {
    const notificationRepository = new InMomeryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification when it does not exist', async () => {
    const notificationRepository = new InMomeryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(async () => {
      return await unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
