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
import { ChannelActive } from '../../domain/ChannelActive';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { UpdatedAt } from '../../../../Shared/domain/UpdatedAt';
import { ChannelStartTime } from '../../domain/ChannelStartTime';
import {
  CHANNEL_REPOSITORY,
  CHANNEL_USER_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { ChannelRepository } from '../../domain/ChannelRepository';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Channel } from '../../domain/Channel';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { ChatsTime } from '../../../../../apps/dazl/backend/config/TimeActivation';
import { ChannelUserByChannelFinder } from '../../../channel-user/application/FindByChannel/ChannelUserByChannelFinder';
import { GetterChannelByUserService } from '../../../channel-user/application/getter-by-user/getter-channel-by-user.service';

@Injectable()
export class ChannelContinueAcceptedService {
  constructor(
    @Inject(CHANNEL_REPOSITORY)
    private readonly channelRepository: ChannelRepository,
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
    private readonly moduleGateway: ModuleGateway,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly finderChannelService: FinderChannelService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly sendNotificationService: SendNotificationService,
    private readonly channelUserByChannelFinder: ChannelUserByChannelFinder,
    private readonly getterChannelByUserService: GetterChannelByUserService,
  ) {}

  async run({
    userActivationToId,
    idChannel,
  }: {
    userActivationToId: string;
    idChannel: string;
  }): Promise<void> {
    try {
      const channel = await this.finderChannelService.run(
        new ChannelId(idChannel),
      );
      const userActivationTo = await this.finderUserActivationService.run(
        new UserActivationId(userActivationToId),
      );

      const timeout = setTimeout(async () => {
        await this.callback(channel);
      }, ChatsTime.CHAT_POSTPONE_TIME);
      channel.secondChance = new ChannelSecondChance(
        ChannelSecondChanceTypes.ACCEPTED,
      );
      channel.active = new ChannelActive(IsBoolean.TRUE);
      channel.updatedAt = new UpdatedAt(new Date().toISOString());
      channel.startTime = new ChannelStartTime(new Date().getTime().toString());
      await this.channelRepository.save(channel);

      const channelUserByChannel = await this.channelUserByChannelFinder.run(
        new ChannelId(idChannel),
      );

      const channelUser = channelUserByChannel.find(
        (channelUser) =>
          channelUser.userActivationId.value === userActivationToId,
      );

      const newVar = await this.getterChannelByUserService.run(
        channelUser.userActivationId.value,
      );
      this.moduleGateway.wss
        .to(userActivationTo.userId.value)
        .emit(ChannelName.CHANNELS, newVar);

      await this.sendNotificationService.sendNotification(
        userActivationTo,
        {
          title: 'Segunda oportunidad',
          body: `${userActivationTo.name} Aceptaron la invitación para continuar la conversación`,
        },
        {},
      );
      this.schedulerRegistry.addTimeout(`${channel.id.value}-END`, timeout);
    } catch (e) {
      console.log(e);
    }
  }

  private async callback(channel: Channel) {
    // channel.active = new ChannelActive(IsBoolean.FALSE);
    //
    // channel.updatedAt = new UpdatedAt(new Date().toISOString());
    // await this.channelRepository.save(channel);
    const channelUsers = await this.channelUserRepository.searchByChannelId(
      channel.id,
    );
    for (const channelUser of channelUsers) {
      const userActivation = await this.finderUserActivationService.run(
        channelUser.userActivationId,
      );
      await this.sendNotificationService.sendNotification(
        userActivation,
        {
          title: 'Conversación',
          body: `Terminó la extensión de tiempo para la conversación`,
        },
        {},
      );
    }
    this.schedulerRegistry.deleteTimeout(channel.id.value);
  }
}
