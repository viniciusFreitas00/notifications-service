import { InMomeryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('Should be able to read a notification', async () => {
    const notificationRepository = new InMomeryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification when it does not exist', async () => {
    const notificationRepository = new InMomeryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(async () => {
      return await readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
