import { EntitySchema } from 'typeorm';
import { ChannelUser } from '../../../domain/ChannelUser';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { ChannelUserId } from '../../../domain/ChannelUserId';
import { ChannelId } from '../../../../channel/domain/ChannelId';
import { UserActivationId } from '../../../../user_activation/domain/UserActivationId';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { ChannelUserSomeoneInvitedMe } from '../../../domain/ChannelUserSomeoneInvitedMe';
import { ChannelUserIInvited } from '../../../domain/ChannelUserIInvited';
import { ChannelUserHide } from '../../../domain/ChannelUserHide';

export const ChannelUserEntity = new EntitySchema<ChannelUser>({
  name: 'ChannelUser',
  tableName: 'channel_users',
  target: ChannelUser,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(ChannelUserId),
    },
    channelId: {
      name: 'channel_id',
      type: String,
      transformer: ValueObjectTransformer(ChannelId),
    },
    userActivationId: {
      name: 'user_activation_id',
      type: String,
      transformer: ValueObjectTransformer(UserActivationId),
    },
    someoneInvitedMe: {
      type: String,
      name: 'someone_invited_me',
      transformer: ValueObjectTransformer(ChannelUserSomeoneInvitedMe),
    },
    iInvited: {
      name: 'i_invited',
      type: Number,
      transformer: ValueObjectTransformer(ChannelUserIInvited),
    },
    hide: {
      type: Number,
      transformer: ValueObjectTransformer(ChannelUserHide),
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(CreatedAt),
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(UpdatedAt),
    },
  },
});
