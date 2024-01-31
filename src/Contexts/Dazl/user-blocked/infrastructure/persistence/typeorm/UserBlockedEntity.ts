import { EntitySchema } from 'typeorm';
import { UserBlocked } from '../../../domain/UserBlocked';
import { UserBlockedId } from '../../../domain/UserBlockedId';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { UserId } from '../../../../users/domain/UserId';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { UserBlockedActive } from '../../../domain/UserBlockedActive';

export const UserBlockedEntity = new EntitySchema<UserBlocked>({
  target: UserBlocked,
  name: 'UserBlocked',
  tableName: 'user_blocked',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserBlockedId),
    },
    userBlocked: {
      type: String,
      name: 'user_blocked',
      transformer: ValueObjectTransformer(UserId),
    },
    userWhoBlocked: {
      type: String,
      name: 'user_who_blocked',
      transformer: ValueObjectTransformer(UserId),
    },
    active: {
      type: Number,
      transformer: ValueObjectTransformer(UserBlockedActive),
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
