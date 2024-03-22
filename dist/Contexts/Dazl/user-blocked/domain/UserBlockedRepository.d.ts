import { Nullable } from '../../../Shared/domain/Nullable';
import { UserBlocked } from './UserBlocked';
import { UserBlockedId } from './UserBlockedId';
import { UserId } from '../../users/domain/UserId';
export interface UserBlockedRepository {
    save(userBlocked: UserBlocked): Promise<void>;
    search(id: UserBlockedId): Promise<Nullable<UserBlocked>>;
    searchAll(): Promise<Array<UserBlocked>>;
    searchByUserWhoBlockedIdAnd(userWhoBlockedId: UserId, userBlockedId: UserId): Promise<Array<UserBlocked>>;
}
