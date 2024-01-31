import { UserLive } from '../../../domain/UserLive';
import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { UserLiveId } from '../../../domain/UserLiveId';
import { UserId } from '../../../../users/domain/UserId';
import { UserLiveActive } from '../../../domain/UserLiveActive';
import { UserLiveActiveDate } from '../../../domain/UserLiveActiveDate';
import { UserLiveExpirationDate } from '../../../domain/UserLiveExpirationDate';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';

export const UserLiveEntity = new EntitySchema<UserLive>({
  tableName: 'user_live',
  name: 'UserLive',
  target: UserLive,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserLiveId),
    },
    userId: {
      type: String,
      name: 'user_id',
      transformer: ValueObjectTransformer(UserId),
    },
    active: {
      type: Number,
      transformer: ValueObjectTransformer(UserLiveActive),
    },
    status: {
      type: 'enum',
      enum: ['active', 'inactive', 'holding'],
      transformer: ValueObjectTransformer(UserLiveActive),
    },
    activeDate: {
      type: Date,
      name: 'active_date',
      transformer: ValueObjectTransformer(UserLiveActiveDate),
    },
    expirationDate: {
      type: Date,
      name: 'expiration_date',
      transformer: ValueObjectTransformer(UserLiveExpirationDate),
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
