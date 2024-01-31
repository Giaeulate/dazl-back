import { Module } from '@nestjs/common';
import { AuthUserLoginModule } from '../auth/auth-user-login.module';
import { MessageWsGateway } from '../../gateways/message-ws.gateway';
import { CreatorMessageService } from '../../../../../Contexts/Dazl/message/application/create/creator-message.service';
import { GetterUnreadMessageService } from '../../../../../Contexts/Dazl/message/application/getter-unread/getter-unread-message.service';
import { SendNotificationService } from '../../../../../Contexts/Dazl/notification/application/send/send-notification.service';
import { SentNotificationOnMessageCreatedService } from '../../../../../Contexts/Dazl/message/application/sent-notification/sent-notification-on-message-created.service';
import { SendReadMessageOnMessageCreatedService } from '../../../../../Contexts/Dazl/message/application/read/send-read-message-on-message-created.service';

@Module({
  imports: [AuthUserLoginModule],
  providers: [
    MessageWsGateway,
    CreatorMessageService,
    GetterUnreadMessageService,
    SendNotificationService,
    SentNotificationOnMessageCreatedService,
    SendReadMessageOnMessageCreatedService,
  ],
})
export class MessageWsModule {}
