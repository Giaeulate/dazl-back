import { Injectable } from '@nestjs/common';
import { GetterChannelByUserService } from '../getter-by-user/getter-channel-by-user.service';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ChannelByUserActivationFinder } from '../FindByUserActivationId/ChannelByUserActivationFinder';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { ChannelUserByChannelFinder } from '../FindByChannel/ChannelUserByChannelFinder';

type Params = {
  userActivationId: UserActivationId;
};

@Injectable()
export class UpdateActiveChatSender {
  constructor(
    private readonly getterChannelByUserService: GetterChannelByUserService,
    private readonly finder: ChannelByUserActivationFinder,
    private readonly gateway: ModuleGateway,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly channelUserByChannelFinder: ChannelUserByChannelFinder,
  ) {}

  async run(params: Params) {
    const { userActivationId } = params;
    const channelsUserByUser = await this.finder.run({ userActivationId });
    if (channelsUserByUser.length === 0) {
      return;
    }
    for (const { channelId } of channelsUserByUser) {
      const channelUserByChannel = await this.channelUserByChannelFinder.run(
        channelId,
      );
      for (const channelUser of channelUserByChannel) {
        const channelUserChatDto = await this.getterChannelByUserService.run(
          channelUser.userActivationId.value,
        );
        const userActivation = await this.finderUserActivationService.run(
          channelUser.userActivationId,
        );
        this.gateway.wss
          .to(userActivation.userId.value)
          .emit(ChannelName.CHANNELS, channelUserChatDto);
      }
    }
  }
}
