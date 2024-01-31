import { EntitySchema } from 'typeorm';
import { UserReport } from '../../../domain/UserReport';
import { UserReportId } from '../../../domain/UserReportId';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { UserId } from '../../../../users/domain/UserId';
import { UserReportReason } from '../../../domain/UserReportReason';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';

export const UserReportEntity = new EntitySchema<UserReport>({
  name: 'UserReport',
  target: UserReport,
  tableName: 'user_reports',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserReportId),
    },
    userWhoReported: {
      name: 'user_who_reported',
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
    userWhoWasReported: {
      name: 'user_who_was_reported',
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
    reason: {
      type: String,
      transformer: ValueObjectTransformer(UserReportReason),
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
