import { Module } from '@nestjs/common';
import { ContinueChannelController } from '../../controllers/continue-channel.controller';
import { ContinueChannelService } from '../../../../../Contexts/Dazl/channel/application/continue-channel/continue-channel.service';
import { ModuleGateway } from '../../gateways/module.gateway';

@Module({
  controllers: [ContinueChannelController],
  providers: [ContinueChannelService, ModuleGateway],
})
export class ContinueChannelModule {}
