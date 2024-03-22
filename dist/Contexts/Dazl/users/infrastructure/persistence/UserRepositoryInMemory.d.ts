import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { UserId } from '../../domain/UserId';
import { Criteria } from '../../../../Shared/domain/Criteria';
import { UserEmail } from '../../domain/UserEmail';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserTokenFirebase } from '../../domain/UserTokenFirebase';
export declare class UserRepositoryInMemory implements UserRepository {
    private readonly users;
    save(user: User): Promise<void>;
    search(id: UserId): Promise<User | undefined>;
    searchByCriteria(criteria: Criteria): Promise<Nullable<User>>;
    searchByEmail(email: UserEmail): Promise<Nullable<User>>;
    searchAll(): Promise<Array<User>>;
    searchByToken(email: UserTokenFirebase): Promise<Nullable<User>>;
}
