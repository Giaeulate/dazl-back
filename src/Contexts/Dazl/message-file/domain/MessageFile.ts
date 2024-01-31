import { MessageId } from '../../message/domain/MessageId';
import { FileId } from '../../file/domain/FileId';
import { MessageFileId } from './MessageFileId';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';

export class MessageFile extends AggregateRoot {
  id: MessageFileId;
  fileId: FileId;
  messageId: MessageId;

  constructor(id: MessageFileId, fileId: FileId, messageId: MessageId) {
    super();
    this.id = id;
    this.fileId = fileId;
    this.messageId = messageId;
  }

  static create(plainData: {
    id: string;
    fileId: string;
    messageId: string;
  }): MessageFile {
    const messageFileFromPrimitives = this.fromPrimitives(plainData);
    const messageFile = new MessageFile(
      messageFileFromPrimitives.id,
      messageFileFromPrimitives.fileId,
      messageFileFromPrimitives.messageId,
    );
    // messageFile.record(new MessageFileCreatedDomainEvent(messageFile));
    return messageFile;
  }

  static fromPrimitives(plainData: {
    id: string;
    fileId: string;
    messageId: string;
  }): MessageFile {
    return new MessageFile(
      new MessageFileId(plainData.id),
      new FileId(plainData.fileId),
      new MessageId(plainData.messageId),
    );
  }

  toPrimitives(): {
    id: string;
    fileId: string;
    messageId: string;
  } {
    return {
      id: this.id.value,
      fileId: this.fileId.value,
      messageId: this.messageId.value,
    };
  }
}
