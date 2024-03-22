import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserActiveHistoryRepository } from '../../domain/UserActiveHistoryRepository';
import { UserActiveHistory } from '../../domain/UserActiveHistory';
import { DataSource, EntitySchema } from 'typeorm';
import { UserActiveHistoryId } from '../../domain/UserActiveHistoryId';
import { UserId } from '../../../users/domain/UserId';
export declare class TypeOrmUserActiveHistoryRepository extends TypeOrmRepository<UserActiveHistory> implements UserActiveHistoryRepository {
    constructor(client: DataSource);
    save(userActiveHistory: UserActiveHistory): Promise<void>;
    search(id: UserActiveHistoryId): Promise<UserActiveHistory>;
    searchAll(): Promise<Array<UserActiveHistory>>;
    protected entitySchema(): EntitySchema<UserActiveHistory>;
    searchAllByUserId(userId: UserId): Promise<Array<UserActiveHistory>>;
}
