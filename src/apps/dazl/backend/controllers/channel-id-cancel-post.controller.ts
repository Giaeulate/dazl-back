import { Controller, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CancelerChannel } from '../../../../Contexts/Dazl/channel/application/canceler/canceler-channel';
import { ChannelId } from '../../../../Contexts/Dazl/channel/domain/ChannelId';
import { AuthGuard } from '@nestjs/passport';
import { GetterChannelByUserService } from '../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
import { ChannelUserByChannelFinder } from '../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder';

@Controller('channel')
@UseGuards(AuthGuard('jwt'))
export class ChannelIdCancelPostController {
  constructor(
    private readonly cancelerChannel: CancelerChannel,
    private readonly getterChannelByUserService: GetterChannelByUserService,
    private readonly channelUserByChannelFinder: ChannelUserByChannelFinder,
  ) {}

  @Post(':id/cancel')
  async run(
    @Param('id') id: string,
    @Query('user_activation_id') userActivationToId: string,
  ): Promise<unknown> {
    await this.cancelerChannel.run(new ChannelId(id));
    const channelUserByChannel = await this.channelUserByChannelFinder.run(
      new ChannelId(id),
    );

    const channelUser = channelUserByChannel.find(
      (channelUser) =>
        channelUser.userActivationId.value === userActivationToId,
    );

    const newVar = await this.getterChannelByUserService.run(
      channelUser.userActivationId.value,
    );
    return {
      items: newVar,
    };
  }
}
