import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@application/use-case/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from '@application/use-case/cancel-notification';
import { ReadNotification } from '@application/use-case/read-notification';
import { CountRecipientNotification } from '@application/use-case/count-recipient-notification';
import { GetRecipientNotification } from '@application/use-case/get-recipient-notifications';
import { UnreadNotification } from '@application/use-case/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
