import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { MessageRepository } from '../../domain/MessageRepository';
import { MessageId } from '../../domain/MessageId';
import { Message } from '../../domain/Message';

@Injectable()
export class FinderMessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
  ) {}

  async run(messageId: MessageId) {
    const message = await this.messageRepository.search(messageId);
    this.ensureMessageExists(message);
    return message;
  }

  private ensureMessageExists(message: Message) {
    if (!message) {
      // throw new MessageNotExist(messageId);
    }
  }
}
