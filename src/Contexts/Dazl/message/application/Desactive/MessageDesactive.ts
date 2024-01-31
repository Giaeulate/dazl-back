import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { MessageRepository } from '../../domain/MessageRepository';
import { FinderMessageService } from '../finder/finder-message.service';
import { MessageId } from '../../domain/MessageId';
import { Message } from '../../domain/Message';
import { MessageNotExist } from '../../domain/MessageNotExist';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';

type Params = {
  messageId: string;
  userActivationId: string;
};

@Injectable()
export class MessageDesactive {
  private readonly finderMessageService: FinderMessageService;

  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    private readonly moduleGateway: ModuleGateway,
    private readonly finderUserActivationService: UserActivationFinder,
  ) {
    this.finderMessageService = new FinderMessageService(messageRepository);
  }

  async run(params: Params) {
    const message = await this.finderMessageService.run(
      new MessageId(params.messageId),
    );
    this.ensureMessageExists(message, new MessageId(params.messageId));
    this.ensureMessageBelongsToUser(message, params.userActivationId);
    message.desactive();
    await this.messageRepository.save(message);
    const userActivation = await this.finderUserActivationService.run(
      message.userToId,
    );
    this.moduleGateway.wss
      .to(userActivation.userId.value)
      .emit(ChannelName.MESSAGE_DELETED, {
        messageId: message.id.value,
      });
  }

  private ensureMessageExists(message: Message, messageId: MessageId) {
    if (!message) {
      throw new MessageNotExist(messageId);
    }
  }

  private ensureMessageBelongsToUser(
    message: Message,
    userActivationId: string,
  ) {
    if (message.useFromId.value !== userActivationId) {
      throw new NotFoundException('Message does not belong to user');
    }
  }
}
