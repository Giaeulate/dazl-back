import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserBlocked } from '../../domain/UserBlocked';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
import { DataSource, EntitySchema } from 'typeorm';
import { UserBlockedId } from '../../domain/UserBlockedId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserId } from '../../../users/domain/UserId';
export declare class TypeOrmUserBlockedRepository extends TypeOrmRepository<UserBlocked> implements UserBlockedRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<UserBlocked>;
    save(userBlocked: UserBlocked): Promise<void>;
    search(id: UserBlockedId): Promise<Nullable<UserBlocked>>;
    searchAll(): Promise<Array<UserBlocked>>;
    searchByUserWhoBlockedIdAnd(userWhoBlockedId: UserId, userBlockedId: UserId): Promise<Array<UserBlocked>>;
}
