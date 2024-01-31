import { MessageId } from './MessageId';
import { NotFoundException } from '@nestjs/common';

export class MessageNotExist {
  constructor(messageId: MessageId) {
    throw new NotFoundException(
      `Message with id <${messageId.value}> does not exist`,
    );
  }
}
