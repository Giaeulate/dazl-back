import { Module } from '@nestjs/common';
import { ChannelContinueAcceptedService } from '../../../../../Contexts/Dazl/channel/application/channel-continue-accepted/channel-continue-accepted.service';
import { ChannelContinueRejectedService } from '../../../../../Contexts/Dazl/channel/application/channel-continue-rejected/channel-continue-rejected.service';
import { ChannelContinueController } from '../../controllers/channel-continue.controller';

@Module({
  controllers: [ChannelContinueController],
  providers: [ChannelContinueAcceptedService, ChannelContinueRejectedService],
})
export class ChannelContinueModule {}
