import { EntitySchema } from 'typeorm';
import { MessageFile } from '../../../domain/MessageFile';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { FileId } from '../../../../file/domain/FileId';
import { MessageFileId } from '../../../domain/MessageFileId';
import { MessageId } from '../../../../message/domain/MessageId';

export const MessageFileEntity = new EntitySchema<MessageFile>({
  name: 'MessageFile',
  tableName: 'message_files',
  target: MessageFile,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(MessageFileId),
    },
    fileId: {
      name: 'file_id',
      type: String,
      transformer: ValueObjectTransformer(FileId),
    },
    messageId: {
      name: 'message_id',
      type: String,
      transformer: ValueObjectTransformer(MessageId),
    },
  },
});
