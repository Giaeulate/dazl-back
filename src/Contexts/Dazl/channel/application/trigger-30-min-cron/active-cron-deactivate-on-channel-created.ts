import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelId } from '../../domain/ChannelId';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { ChannelUserChatDto } from '../../../channel-user/domain/dto/ChannelUserChatDto';
import { UsersActiveFileUserDto } from '../../../user_activation/domain/dto/indexDto';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { UpdaterChannel } from '../updater/updater-channel';
import { FinderChannelService } from '../finder/finder-channel.service';
import { ChannelCreatedDomainEvent } from '../../domain/ChannelCreatedDomainEvent';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { NotificationsService } from '../../../notification/application/push-notification/push-notification.service';

@Injectable()
export class ActiveCronDeactivateOnChannelCreated {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly moduleGateway: ModuleGateway,
    private readonly userFinderService: UserFinderService,
    private readonly fileFinderService: FileFinderService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly updaterChannel: UpdaterChannel,
    private readonly finderChannelService: FinderChannelService,
    private readonly sendNotificationService: NotificationsService,
  ) {}

  @OnEvent(ChannelCreatedDomainEvent.name)
  async on(event: ChannelCreatedDomainEvent) {
    try {
      // const timeout = setTimeout(async () => {
      //   await this.callback(new ChannelId(event.aggregateId));
      // }, ChatsTime.CHAT_TIME);
      // this.schedulerRegistry.addTimeout(`30-${event.aggregateId}`, timeout);
    } catch (e) {
      console.error(e);
    }
  }

  private callback = async (idChannel: ChannelId) => {
    try {
      const channel = await this.finderChannelService.run(idChannel);

      const channelUsers = await this.channelUserRepository.searchByChannelId(
        channel.id,
      );
      for (const channelUserForEach of channelUsers) {
        const userActivation = await this.finderUserActivationService.run(
          channelUserForEach.userActivationId,
        );
        const filter = channelUsers.filter(
          ({ userActivationId }) =>
            !channelUserForEach.userActivationId.equals(userActivationId),
        );

        const usersActiveFileUserDtoPromise = filter.map(
          async (channelUser) => {
            const channel = await this.finderChannelService.run(
              channelUser.channelId,
            );
            const userActivationFrom =
              await this.finderUserActivationService.run(
                channelUser.userActivationId,
              );
            const user = await this.userFinderService.invoke(
              userActivationFrom.userId,
            );
            const file = await this.fileFinderService.invoke(
              userActivationFrom.fileImageId,
            );
            return new ChannelUserChatDto(
              channel,
              new UsersActiveFileUserDto(
                userActivationFrom.toPrimitives().convertToDto(),
                file,
                user,
              ),
              0,
              0,
              '',
              channel.active.value,
              new Date(channel.createdAt.value),
              {
                minutes: 0,
                seconds: 0,
              },
            );
          },
        );
        const usersActiveFileUserDto = await Promise.all(
          usersActiveFileUserDtoPromise,
        );

        for (const channelUser of usersActiveFileUserDto) {
          if (
            userActivation.active.isActive() &&
            userActivation.userIsDeleted.isAvailable() &&
            channel.active.isActive()
          ) {
            const userNoti = await this.userFinderService.invoke(
              userActivation.userId,
            );
            if (userNoti) {
              await this.sendNotificationService.sendPushNotification(
                userNoti.id,
                userNoti.tokenFirebase.value,
                {
                  notification: {
                    title: 'Conversación',
                    body: `Una conversación, ya terminó`,
                  },
                  data: {},
                },
              );

              this.moduleGateway.wss
                .to(userActivation.userId.value)
                .emit(ChannelName.CHANNEL_END, channelUser);
            }
          }
        }
      }

      this.schedulerRegistry.deleteTimeout(`30-${idChannel.value}`);
      await this.updaterChannel.run(idChannel, {
        active: IsBoolean.FALSE,
      });
    } catch (e) {
      console.error(e);
    }
  };
}
