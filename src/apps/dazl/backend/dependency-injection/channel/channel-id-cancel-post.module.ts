import { Module } from '@nestjs/common';
import { ChannelIdCancelPostController } from '../../controllers/channel-id-cancel-post.controller';
import { CancelerChannel } from '../../../../../Contexts/Dazl/channel/application/canceler/canceler-channel';

@Module({
  controllers: [ChannelIdCancelPostController],
  providers: [CancelerChannel],
})
export class ChannelIdCancelPostModule {}
