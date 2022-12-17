import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NotificationRepository } from '@application/repositories/notification-repositories';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notifcation-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
