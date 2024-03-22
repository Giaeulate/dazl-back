import { UserActiveHistory } from './UserActiveHistory';
import { UserActiveHistoryId } from './UserActiveHistoryId';
import { Nullable } from '../../../Shared/domain/Nullable';
import { UserId } from '../../users/domain/UserId';
export interface UserActiveHistoryRepository {
    save(userActiveHistory: UserActiveHistory): Promise<void>;
    search(id: UserActiveHistoryId): Promise<Nullable<UserActiveHistory>>;
    searchAll(): Promise<Array<UserActiveHistory>>;
    searchAllByUserId(userId: UserId): Promise<Array<UserActiveHistory>>;
}
