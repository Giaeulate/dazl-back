import { UserReport } from './UserReport';
import { Nullable } from '../../../Shared/domain/Nullable';
import { UserReportId } from './UserReportId';
import { UserId } from '../../users/domain/UserId';

export interface UserReportRepository {
  save(userReport: UserReport): Promise<void>;

  search(id: UserReportId): Promise<Nullable<UserReport>>;

  searchAll(): Promise<Array<UserReport>>;

  searchByUser(user: UserId): Promise<Array<UserReport>>;
}
