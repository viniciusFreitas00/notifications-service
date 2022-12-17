import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

const notifications: Notification[] = [];

const notificationRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Send Notification', () => {
  it('Should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationRepository);

    await sendNotification.execute({
      recipientId: 'example-recipient-id',
      content: 'Você recebeu uma solicitação de amizade',
      category: 'social',
    });

    console.log(notifications);

    expect(notifications).toHaveLength(1);
  });
});
