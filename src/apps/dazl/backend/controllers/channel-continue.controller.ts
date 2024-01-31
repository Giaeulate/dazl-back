import { Controller, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ChannelContinueRejectedService } from '../../../../Contexts/Dazl/channel/application/channel-continue-rejected/channel-continue-rejected.service';
import { ChannelContinueAcceptedService } from '../../../../Contexts/Dazl/channel/application/channel-continue-accepted/channel-continue-accepted.service';
import { AuthGuard } from '@nestjs/passport';
import { GetterChannelByUserService } from '../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
import { ChannelUserByChannelFinder } from '../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder';
import { ChannelId } from '../../../../Contexts/Dazl/channel/domain/ChannelId';

@Controller('channel')
@UseGuards(AuthGuard('jwt'))
export class ChannelContinueController {
  constructor(
    private readonly channelContinueAcceptedService: ChannelContinueAcceptedService,
    private readonly channelContinueRejectedService: ChannelContinueRejectedService,
    private readonly getterChannelByUserService: GetterChannelByUserService,
    private readonly channelUserByChannelFinder: ChannelUserByChannelFinder,
  ) {}

  @Post(':id/accepted')
  async runAccepted(
    @Query('user_activation_to_id') userActivationToId: string,
    @Query('user_activation_id') userActivationId: string,
    @Param('id') idChannel: string,
  ): Promise<unknown> {
    await this.channelContinueAcceptedService.run({
      userActivationToId,
      idChannel,
    });
    const channelUserByChannel = await this.channelUserByChannelFinder.run(
      new ChannelId(idChannel),
    );

    const channelUser = channelUserByChannel.find(
      (channelUser) => channelUser.userActivationId.value === userActivationId,
    );

    const newVar = await this.getterChannelByUserService.run(
      channelUser.userActivationId.value,
    );
    return {
      items: newVar,
    };
  }

  @Post(':id/rejected')
  async runRejected(
    @Query('user_activation_to_id') userActivationToId: string,
    @Query('user_activation_id') userActivationId: string,
    @Param('id') idChannel: string,
  ): Promise<unknown> {
    await this.channelContinueRejectedService.run({
      userActivationToId,
      idChannel,
    });
    const channelUserByChannel = await this.channelUserByChannelFinder.run(
      new ChannelId(idChannel),
    );

    const channelUser = channelUserByChannel.find(
      (channelUser) => channelUser.userActivationId.value === userActivationId,
    );

    const newVar = await this.getterChannelByUserService.run(
      channelUser.userActivationId.value,
    );
    return {
      items: newVar,
    };
  }
}
