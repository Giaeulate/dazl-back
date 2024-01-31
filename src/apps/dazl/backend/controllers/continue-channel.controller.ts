import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ContinueChannelService } from '../../../../Contexts/Dazl/channel/application/continue-channel/continue-channel.service';
import { ContinueChannelRequestDto } from '../../../../Contexts/Dazl/channel/application/continue-channel/dto/ContinueChannelRequestDto';
import { AuthGuard } from '@nestjs/passport';
import { ChannelId } from '../../../../Contexts/Dazl/channel/domain/ChannelId';
import { GetterChannelByUserService } from '../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
import { ChannelUserByChannelFinder } from '../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder';

@Controller('channel')
@UseGuards(AuthGuard('jwt'))
export class ContinueChannelController {
  constructor(
    private readonly continueChannelService: ContinueChannelService,
    private readonly getterChannelByUserService: GetterChannelByUserService,
    private readonly channelUserByChannelFinder: ChannelUserByChannelFinder,
  ) {}

  @Post(':id/continue')
  async run(
    @Param('id') idChannel: string,
    @Body() request: ContinueChannelRequestDto,
  ): Promise<unknown> {
    console.log('ContinueChannelController', request);
    await this.continueChannelService.run(idChannel, request);
    const channelUserByChannel = await this.channelUserByChannelFinder.run(
      new ChannelId(idChannel),
    );

    const channelUser = channelUserByChannel.find(
      (channelUser) =>
        channelUser.userActivationId.value === request.userActivationId,
    );

    const newVar = await this.getterChannelByUserService.run(
      channelUser.userActivationId.value,
    );
    console.log('ContinueChannelController', newVar);
    return {
      items: newVar,
    };
  }
}
