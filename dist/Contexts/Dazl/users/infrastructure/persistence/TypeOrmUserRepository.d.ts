import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { DataSource, EntitySchema } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserEmail } from '../../domain/UserEmail';
import { Criteria } from '../../../../Shared/domain/Criteria';
import { UserTokenFirebase } from '../../domain/UserTokenFirebase';
export declare class TypeOrmUserRepository extends TypeOrmRepository<User> implements UserRepository {
    constructor(dataSource: DataSource);
    searchByCriteria(criteria: Criteria): Promise<User>;
    search(id: UserId): Promise<Nullable<User>>;
    searchByEmail(email: UserEmail): Promise<Nullable<User>>;
    save(user: User): Promise<void>;
    protected entitySchema(): EntitySchema<User>;
    searchAll(): Promise<Array<User>>;
    searchByToken(token: UserTokenFirebase): Promise<Nullable<User>>;
}
