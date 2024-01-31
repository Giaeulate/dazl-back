import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessageCreatedDomainEvent } from '../../domain/MessageCreatedDomainEvent';
import { ChannelId } from '../../../channel/domain/ChannelId';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { GetterUnreadMessageService } from '../getter-unread/getter-unread-message.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { FinderByMessageService } from '../../../message-file/application/finder-by-message/finder-by-message.service';
import { ConvertMessageResponse } from '../ConvertResponse/ConvertMessageResponse';

@Injectable()
export class SendReadMessageOnMessageCreatedService {
  constructor(
    private readonly moduleGateway: ModuleGateway,
    private readonly getterUnreadMessageService: GetterUnreadMessageService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly finderByMessageService: FinderByMessageService,
    private readonly convertMessageResponse: ConvertMessageResponse,
  ) {}

  @OnEvent(MessageCreatedDomainEvent.name)
  async on(event: MessageCreatedDomainEvent) {
    console.log('SendReadMessageOnMessageCreatedService.on');
    const userActivationTo = await this.finderUserActivationService.run(
      new UserActivationId(event.userToId),
    );
    const messagesUnread = await this.getterUnreadMessageService.run(
      new ChannelId(event.channelId),
      userActivationTo.id,
    );
    const messagePromise = messagesUnread.map(async (message) => {
      const messageFile = await this.finderByMessageService.run(
        message.id.value,
      );

      return await this.convertMessageResponse.run({
        message: message,
        messageFile: messageFile,
      });
    });
    const messages = await Promise.all(messagePromise);
    console.log('messages', messages);
    this.moduleGateway.wss
      .to(userActivationTo.userId.value)
      .emit(ChannelName.UNREADED_MESSAGE, {
        unreaded_messages: messages,
      });
    console.log('SendReadMessageOnMessageCreatedService.on', 'end');
  }
}
