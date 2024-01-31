import { UserActiveHistory } from '../../../domain/UserActiveHistory';
import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { UserActiveHistoryId } from '../../../domain/UserActiveHistoryId';
import { UserId } from '../../../../users/domain/UserId';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { UserActiveHistoryStartTime } from '../../../domain/UserActiveHistoryStartTime';
import { UserActiveHistoryEndTime } from '../../../domain/UserActiveHistoryEndTime';
import { UserActiveHistoryStatus } from '../../../domain/UserActiveHistoryStatus';

export const UserActiveHistoryEntity = new EntitySchema<UserActiveHistory>({
  name: 'UserActiveHistory',
  tableName: 'user_active_histories',
  target: UserActiveHistory,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserActiveHistoryId),
    },
    userId: {
      name: 'user_id',
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
    startTime: {
      name: 'start_time',
      type: String,
      transformer: ValueObjectTransformer(UserActiveHistoryStartTime),
    },
    endTime: {
      name: 'end_time',
      type: String,
      transformer: ValueObjectTransformer(UserActiveHistoryEndTime),
    },
    status: {
      type: String,
      transformer: ValueObjectTransformer(UserActiveHistoryStatus),
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
