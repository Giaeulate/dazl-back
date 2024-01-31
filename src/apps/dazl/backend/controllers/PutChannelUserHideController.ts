import { Body, Controller, Put } from '@nestjs/common';
import { HideChannelUser } from '../../../../Contexts/Dazl/channel-user/application/hide/HideChannelUser';
import { GetterChannelByUserService } from '../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';

class BodyPutChannelUserHide {
  readonly user_activation_id: string;
  readonly channel_id: string;
}

@Controller('v1/channel-user')
export class PutChannelUserHideController {
  constructor(
    private readonly user: HideChannelUser,
    private readonly getterChannelByUserService: GetterChannelByUserService,
  ) {}

  @Put('hide')
  public async run(
    @Body() { user_activation_id, channel_id }: BodyPutChannelUserHide,
  ): Promise<unknown> {
    console.log('PutChannelUserHideController');
    console.log(user_activation_id);
    console.log(channel_id);
    await this.user.run({
      userActivationId: user_activation_id,
      channelId: channel_id,
    });
    const newVar = await this.getterChannelByUserService.run(
      user_activation_id,
    );
    console.log(newVar);
    return {
      items: newVar,
    };
  }
}
