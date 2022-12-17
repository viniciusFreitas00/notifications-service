import { InMomeryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotification } from './count-recipient-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipients notifications', () => {
  it('Should be able to count recipient notifications', async () => {
    const notificationRepository = new InMomeryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-recipient-1',
    });

    expect(count).toEqual(2);
  });
});
