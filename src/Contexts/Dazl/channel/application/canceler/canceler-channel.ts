import { Inject, Injectable } from '@nestjs/common';
import { ChannelId } from '../../domain/ChannelId';
import { FinderChannelService } from '../finder/finder-channel.service';
import { UpdaterChannel } from '../updater/updater-channel';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { UserActivation } from '../../../user_activation/domain/UserActivation';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../user_activation/application/getter-current-status/getter-user-activation-status.service';

@Injectable()
export class CancelerChannel {
  constructor(
    private readonly finderChannelService: FinderChannelService,
    private readonly updaterChannel: UpdaterChannel,
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
    private readonly moduleGateway: ModuleGateway,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly sendNotificationService: SendNotificationService,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
  ) {}

  async run(id: ChannelId) {
    const channel = await this.finderChannelService.run(id);
    await this.updaterChannel.run(channel.id, { active: IsBoolean.FALSE });

    const channelUsers = await this.channelUserRepository.searchByChannelId(id);
    const usersActivePromise = channelUsers.map((channelUser) =>
      this.finderUserActivationService.run(channelUser.userActivationId),
    );

    const usersActive = await Promise.all(usersActivePromise);

    for (const userActivation of usersActive) {
      await this.cancelChannel(userActivation);
    }

    // TODO: refactor event
  }

  private async cancelChannel(userActive: UserActivation): Promise<void> {
    const list = await this.getterUserActivationStatusService.run(
      userActive.id.value,
      {
        lowerAge: userActive.ageLowerFilter,
        upperAge: userActive.ageUpperFilter,
        distance: userActive.distanceFilter,
      },
    );
    this.moduleGateway.wss
      .to(userActive.userId.value)
      .emit(ChannelName.CANCEL_CHAT, list);
    await this.sendNotificationService.sendNotification(
      userActive,
      {
        title: 'Conversación',
        body: `Un chat fué cancelado`,
      },
      {},
    );
  }
}
