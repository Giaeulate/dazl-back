import { OnEvent } from '@nestjs/event-emitter';
import { ChannelId } from '../../domain/ChannelId';
import { Inject, Injectable } from '@nestjs/common';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { ChannelUserChatDto } from '../../../channel-user/domain/dto/ChannelUserChatDto';
import { UsersActiveFileUserDto } from '../../../user_activation/domain/dto/indexDto';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { FinderChannelService } from '../finder/finder-channel.service';
import { ChannelCreatedDomainEvent } from '../../domain/ChannelCreatedDomainEvent';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { ChatsTime } from '../../../../../apps/dazl/backend/config/TimeActivation';
import { GetterCronService } from '../getter-cron/getter-cron.service';

@Injectable()
export class ActiveCronReminderOnChannelCreated {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly moduleGateway: ModuleGateway,
    private readonly userFinderService: UserFinderService,
    private readonly fileFinderService: FileFinderService,
    private readonly finderChannelService: FinderChannelService,
    private readonly sendNotificationService: SendNotificationService,
    private readonly getterCronService: GetterCronService,
  ) {}

  @OnEvent(ChannelCreatedDomainEvent.name)
  async on(event: ChannelCreatedDomainEvent) {
    try {
      const timeout = setTimeout(async () => {
        await this.callback(event.aggregateId);
      }, ChatsTime.CHAT_TIME_5_MIN);
      this.schedulerRegistry.addTimeout(`25-${event.aggregateId}`, timeout);
    } catch (e) {
      console.error(e);
    }
  }

  private callback = async (channelId: string) => {
    try {
      const channelOutside = await this.finderChannelService.run(
        new ChannelId(channelId),
      );

      const channelUsers = await this.channelUserRepository.searchByChannelId(
        channelOutside.id,
      );
      const verifyUsersAreAvailable = channelUsers.some(async (channelUser) => {
        const userActivation = await this.finderUserActivationService.run(
          channelUser.userActivationId,
        );
        return !userActivation.userIsDeleted.isAvailable();
      });
      if (!verifyUsersAreAvailable) return;

      // if (!channelUsers) throw new NotFoundException('Channel Users not found');

      for (const channelUser of channelUsers) {
        const userActivation = await this.finderUserActivationService.run(
          channelUser.userActivationId,
        );
        const filter = channelUsers.filter(
          ({ userActivationId }) =>
            !channelUser.userActivationId.equals(userActivationId),
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
            if (!user) return;
            const file = await this.fileFinderService.invoke(
              userActivationFrom.fileImageId,
            );
            const timeLeft = this.getterCronService.run(channel);
            return new ChannelUserChatDto(
              channel,
              new UsersActiveFileUserDto(
                userActivationFrom.toPrimitives().convertToDto(),
                file,
                user,
              ),
              0,
              channelUser.iInvited.value,
              channelUser.someoneInvitedMe.value,
              channel.active.value,
              new Date(channel.createdAt.value),
              timeLeft,
            );
          },
        );

        const usersActiveFileUserDto = await Promise.all(
          usersActiveFileUserDtoPromise,
        );
        for (const channelUser of usersActiveFileUserDto) {
          if (
            userActivation.active.isActive() &&
            channelOutside.active.isActive()
          ) {
            await this.sendNotificationService.sendNotification(
              userActivation,
              {
                title: 'Conversación',
                body: `Te quedan 5 minutos en una conversación`,
              },
              {},
            );

            this.moduleGateway.wss
              .to(userActivation.userId.value)
              .emit(ChannelName.CHANNEL_REMINDER_TIMER, channelUser);
          }
        }
      }
      this.schedulerRegistry.deleteTimeout(`25-${channelOutside.id.value}`);
    } catch (e) {
      console.error(e);
    }
  };
}
