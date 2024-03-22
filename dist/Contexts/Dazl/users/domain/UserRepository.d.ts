import { User } from './User';
import { Nullable } from '../../../Shared/domain/Nullable';
import { UserId } from './UserId';
import { Criteria } from '../../../Shared/domain/Criteria';
import { UserEmail } from './UserEmail';
import { UserTokenFirebase } from './UserTokenFirebase';
export interface UserRepository {
    save(user: User): Promise<void>;
    search(id: UserId): Promise<Nullable<User>>;
    searchByEmail(email: UserEmail): Promise<Nullable<User>>;
    searchByToken(email: UserTokenFirebase): Promise<Nullable<User>>;
    searchByCriteria(criteria: Criteria): Promise<Nullable<User>>;
    searchAll(): Promise<Array<User>>;
}
