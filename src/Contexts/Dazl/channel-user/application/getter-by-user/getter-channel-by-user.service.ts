import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import {
  CHANNEL_REPOSITORY,
  CHANNEL_USER_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { ChannelRepository } from '../../../channel/domain/ChannelRepository';
import { ChannelUserChatDto } from '../../domain/dto/ChannelUserChatDto';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UsersActiveFileUserDto } from '../../../user_activation/domain/dto/indexDto';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { GetterUnreadMessageService } from '../../../message/application/getter-unread/getter-unread-message.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterCronService } from '../../../channel/application/getter-cron/getter-cron.service';

@Injectable()
export class GetterChannelByUserService {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
    @Inject(CHANNEL_REPOSITORY)
    private readonly channelRepository: ChannelRepository,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly userFinderService: UserFinderService,
    private readonly fileFinderService: FileFinderService,
    private readonly getterUnreadMessageService: GetterUnreadMessageService,
    private readonly getterCronService: GetterCronService,
  ) {}

  async run(userActivationId: string) {
    const userActivation = await this.finderUserActivationService.run(
      new UserActivationId(userActivationId),
    );
    if (!userActivation.userIsDeleted.isAvailable()) return [];
    const channelUserByUserAll =
      await this.channelUserRepository.searchByUserActivationId(
        userActivation.id,
      );
    const channelUserChannelPromise = channelUserByUserAll.map(
      async (channelUser) => {
        const channel = await this.channelRepository.search(
          channelUser.channelId,
        );
        return {
          channelUser: channelUser,
          channel: channel,
        };
      },
    );
    const channelUserChannel = await Promise.all(channelUserChannelPromise);
    const channelUserByUser = channelUserChannel
      .filter(({ channel }) => {
        return channel;
      })
      .flatMap(({ channelUser }) => channelUser);

    const flatMap = channelUserByUser.flatMap(
      (channelUser) => channelUser.channelId,
    );
    const channelsUserByUser = await Promise.all(
      flatMap.map(async (channelId) => {
        const channelUsers = await this.channelUserRepository.searchByChannelId(
          channelId,
        );
        if (!channelUsers) throw new NotFoundException('List is empty');
        return channelUsers.find(
          (channelUser) =>
            !channelUser.userActivationId.equals(userActivation.id),
        );
      }),
    );

    const promise = channelsUserByUser.map(async (channelUser) => {
      if (!channelUser) return;
      const channel = await this.channelRepository.search(
        channelUser.channelId,
      );
      if (!channel) throw new NotFoundException('channel not found');
      const userActivationFrom = await this.finderUserActivationService.run(
        channelUser.userActivationId,
      );
      const channelsUser =
        await this.channelUserRepository.searchByUserActivationId(
          new UserActivationId(userActivationId),
        );
      const channelUserMe = channelsUser.find(
        (user) => user.channelId.value === channelUser.channelId.value,
      );

      const messagesUnread = await this.getterUnreadMessageService.run(
        channel.id,
        userActivation.id,
      );
      const user = await this.userFinderService.invoke(
        userActivationFrom.userId,
      );
      if (!user) return;
      const file = await this.fileFinderService.invoke(
        userActivationFrom.fileImageId,
      );
      if (channelUserMe.hide.value === 1) return null;
      return new ChannelUserChatDto(
        channel,
        new UsersActiveFileUserDto(
          userActivationFrom.toPrimitives().convertToDto(),
          file,
          user,
        ),
        messagesUnread.length,
        channelUserMe.iInvited.value,
        channelUserMe.someoneInvitedMe.value,
        channel.active.value,
        new Date(channel.createdAt.value),
        this.getterCronService.run(channel),
      );
    });

    const channelUserChatDtos = await Promise.all(promise);
    return channelUserChatDtos
      .filter((channelUserChatDto) => channelUserChatDto)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
