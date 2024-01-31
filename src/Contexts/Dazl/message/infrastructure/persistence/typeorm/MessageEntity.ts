import { EntitySchema } from 'typeorm';
import { Message } from '../../../domain/Message';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { MessageId } from '../../../domain/MessageId';
import { MessageText } from '../../../domain/MessageText';
import { MessageIsSent } from '../../../domain/MessageIsSent';
import { ChannelId } from '../../../../channel/domain/ChannelId';
import { MessageActive } from '../../../domain/MessageActive';
import { UserActivationId } from '../../../../user_activation/domain/UserActivationId';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { MessageType } from '../../../domain/MessageType';
import { MessageUserReadId } from '../../../domain/MessageUserReadId';
import { MessageReported } from '../../../domain/MessageReported';
import { MessageResponse } from '../../../domain/MessageResponse';

export const MessageEntity = new EntitySchema<Message>({
  name: 'Message',
  tableName: 'messages',
  target: Message,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(MessageId),
    },
    text: {
      type: 'text',
      transformer: ValueObjectTransformer(MessageText),
    },
    isSent: {
      name: 'is_sent',
      type: Number,
      transformer: ValueObjectTransformer(MessageIsSent),
    },
    channelId: {
      name: 'channel_id',
      type: String,
      transformer: ValueObjectTransformer(ChannelId),
    },
    type: {
      type: String,
      transformer: ValueObjectTransformer(MessageType),
    },
    active: {
      type: Number,
      transformer: ValueObjectTransformer(MessageActive),
    },
    useFromId: {
      name: 'user_from_id',
      type: String,
      transformer: ValueObjectTransformer(UserActivationId),
    },
    userToId: {
      name: 'user_to_id',
      type: String,
      transformer: ValueObjectTransformer(UserActivationId),
    },
    userReadId: {
      name: 'user_read_id',
      type: String,
      transformer: ValueObjectTransformer(MessageUserReadId),
    },
    reported: {
      type: Boolean,
      transformer: ValueObjectTransformer(MessageReported),
    },
    response: {
      type: String,
      transformer: ValueObjectTransformer(MessageResponse),
    },
    createdAt: {
      name: 'created_at',
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(CreatedAt),
    },
    updatedAt: {
      name: 'updated_at',
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(UpdatedAt),
    },
  },
});
