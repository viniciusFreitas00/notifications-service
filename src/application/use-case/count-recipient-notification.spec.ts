import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMomeryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count recipients notifications', () => {
  it('Should be able to count recipient a notification', async () => {
    const notificationRepository = new InMomeryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      new Notification({
        recipientId: 'example-recipient-1',
        content: new Content('Você recebeu uma solicitação de amizade'),
        category: 'social',
      }),
    );

    await notificationRepository.create(
      new Notification({
        recipientId: 'example-recipient-1',
        content: new Content('Você recebeu uma solicitação de amizade'),
        category: 'social',
      }),
    );

    await notificationRepository.create(
      new Notification({
        recipientId: 'example-recipient-2',
        content: new Content('Você recebeu uma solicitação de amizade'),
        category: 'social',
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-recipient-1',
    });

    expect(count).toEqual(2);
  });
});
