import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { MessageRepository } from '../../domain/MessageRepository';
import { ChannelId } from '../../../channel/domain/ChannelId';
import { Message } from '../../domain/Message';

@Injectable()
export class FinderAllMessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
  ) {}

  async run(channelId: ChannelId): Promise<Array<Message>> {
    const messages = await this.messageRepository.searchByChannelId(channelId);
    this.ensureMessagesExists(messages);
    return messages;
  }

  private ensureMessagesExists(messages: Array<Message>) {
    if (!messages) throw new NotFoundException('Messages not found');
  }
}
