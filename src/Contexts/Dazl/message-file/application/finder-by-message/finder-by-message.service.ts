import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_FILE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { MessageFileRepository } from '../../domain/MessageFileRepository';
import { MessageFile } from '../../domain/MessageFile';
import { MessageId } from '../../../message/domain/MessageId';

@Injectable()
export class FinderByMessageService {
  constructor(
    @Inject(MESSAGE_FILE_REPOSITORY)
    private readonly messageFileRepository: MessageFileRepository,
  ) {}

  async run(messageId: string): Promise<MessageFile> {
    return await this.messageFileRepository.searchByMessageId(
      new MessageId(messageId),
    );
  }
}
