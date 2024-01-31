import { Inject, Injectable } from '@nestjs/common';
import { FinderChannelService } from '../../../channel/application/finder/finder-channel.service';
import { ChannelId } from '../../../channel/domain/ChannelId';
import { FinderAllMessageService } from '../finder-all/finder-all-message.service';
import { MessageUserReadId } from '../../domain/MessageUserReadId';
import { MESSAGE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { MessageRepository } from '../../domain/MessageRepository';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { GetterUnreadMessageService } from '../getter-unread/getter-unread-message.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { FinderByMessageService } from '../../../message-file/application/finder-by-message/finder-by-message.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';

@Injectable()
export class ReadMessageService {
  constructor(
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly finderChannelService: FinderChannelService,
    private readonly finderAllMessageService: FinderAllMessageService,
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    private readonly moduleGateway: ModuleGateway,
    private readonly getterUnreadMessageService: GetterUnreadMessageService,
    private readonly finderByMessageService: FinderByMessageService,
    private readonly fileFinderService: FileFinderService,
  ) {}

  async run(userToId: string, channelId: string): Promise<void> {
    const userActivation = await this.finderUserActivationService.run(
      new UserActivationId(userToId),
    );
    const channel = await this.finderChannelService.run(
      new ChannelId(channelId),
    );
    const messages = await this.finderAllMessageService.run(channel.id);
    const messageUnread = messages.filter((message) =>
      message.userToId.equals(userActivation.id),
    );
    // TODO: refactor updater
    await Promise.all(
      messageUnread.map(async (message) => {
        message.userReadId = new MessageUserReadId('0');
        await this.messageRepository.save(message);
        return message;
      }),
    );
    const messagesUnread = await this.getterUnreadMessageService.run(
      channel.id,
      userActivation.id,
    );
    const messagePromise = messagesUnread.map(async (message) => {
      const messageFile = await this.finderByMessageService.run(
        message.id.value,
      );
      let file = null;
      if (messageFile) {
        file = await this.fileFinderService.invoke(messageFile.fileId);
      }
      return {
        ...message.toPrimitives(),
        file: file ? file.toPrimitives() : null,
      };
    });
    const messagesV1 = await Promise.all(messagePromise);
    console.log('messagesV1', messagesV1);

    this.moduleGateway.wss
      .to(userActivation.userId.value)
      .emit(ChannelName.UNREADED_MESSAGE, {
        unreaded_messages: messagesV1,
      });
  }
}
