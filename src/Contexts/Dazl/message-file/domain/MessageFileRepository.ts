import { MessageFile } from './MessageFile';
import { Nullable } from '../../../Shared/domain/Nullable';
import { MessageFileId } from './MessageFileId';
import { MessageId } from '../../message/domain/MessageId';

export interface MessageFileRepository {
  save(messageFile: MessageFile): Promise<void>;
  search(id: MessageFileId): Promise<Nullable<MessageFile>>;
  searchByMessageId(messageId: MessageId): Promise<Nullable<MessageFile>>;
}
