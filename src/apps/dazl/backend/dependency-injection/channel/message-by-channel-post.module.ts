import { Module } from '@nestjs/common';
import { MessageByChannelPostController } from '../../controllers/message-by-channel-post.controller';
import { GetterMessageByChannelService } from '../../../../../Contexts/Dazl/channel/application/getter-message/getter-message-by-channel.service';
import { GetterCronService } from '../../../../../Contexts/Dazl/channel/application/getter-cron/getter-cron.service';
import { CancelChats } from '../../../../../Contexts/Dazl/channel/application/CancelChats/CancelChats';
import { CancelChatsOnUserDeactivated } from '../../../../../Contexts/Dazl/channel/application/CancelChats/CancelChatsOnUserDeactivated';

@Module({
  imports: [],
  controllers: [MessageByChannelPostController],
  providers: [
    GetterMessageByChannelService,
    GetterCronService,
    CancelChats,
    CancelChatsOnUserDeactivated,
  ],
})
export class MessageByChannelPostModule {}
