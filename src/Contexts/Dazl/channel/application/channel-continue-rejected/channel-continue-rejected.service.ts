import { Inject, Injectable } from '@nestjs/common';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { FinderChannelService } from '../finder/finder-channel.service';
import { ChannelId } from '../../domain/ChannelId';
import {
  ChannelSecondChance,
  ChannelSecondChanceTypes,
} from '../../domain/ChannelSecondChance';
import { UpdatedAt } from '../../../../Shared/domain/UpdatedAt';
import { CHANNEL_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelRepository } from '../../domain/ChannelRepository';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';

@Injectable()
export class ChannelContinueRejectedService {
  constructor(
    @Inject(CHANNEL_REPOSITORY)
    private readonly channelRepository: ChannelRepository,
    private readonly moduleGateway: ModuleGateway,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly finderChannelService: FinderChannelService,
    private readonly sendNotificationService: SendNotificationService,
  ) {}

  async run({
    userActivationToId,
    idChannel,
  }: {
    userActivationToId: string;
    idChannel: string;
  }): Promise<void> {
    const channel = await this.finderChannelService.run(
      new ChannelId(idChannel),
    );
    const userActivationTo = await this.finderUserActivationService.run(
      new UserActivationId(userActivationToId),
    );

    channel.desactivate();

    channel.secondChance = new ChannelSecondChance(
      ChannelSecondChanceTypes.REJECT,
    );
    channel.updatedAt = new UpdatedAt(new Date().toISOString());
    await this.channelRepository.save(channel);

    this.moduleGateway.wss
      .to(userActivationTo.userId.value)
      .emit(ChannelName.NOTIFICATION_CONTINUE_CHANNEL, {
        status: false,
      });

    await this.sendNotificationService.sendNotification(
      userActivationTo,
      {
        title: 'Segunda oportunidad',
        body: `${userActivationTo.name} Rechazarón la invitación para continuar la conversación`,
      },
      {
        type: 'invitation',
      },
    );
  }
}
