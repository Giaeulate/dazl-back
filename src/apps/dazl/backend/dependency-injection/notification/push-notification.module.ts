import { Module } from '@nestjs/common';
import { PushNotificationController } from '../../controllers/push-notification.controller';

@Module({
  controllers: [PushNotificationController],
  providers: [],
})
export class PushNotificationModule {}
