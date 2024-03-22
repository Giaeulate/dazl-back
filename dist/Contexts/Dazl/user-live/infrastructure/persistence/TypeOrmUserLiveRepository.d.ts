import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserLive } from '../../domain/UserLive';
import { UserLiveRepository } from '../../domain/UserLiveRepository';
import { DataSource, EntitySchema } from 'typeorm';
import { UserLiveId } from '../../domain/UserLiveId';
import { Nullable } from '../../../../Shared/domain/Nullable';
export declare class TypeOrmUserLiveRepository extends TypeOrmRepository<UserLive> implements UserLiveRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<UserLive>;
    save(userLive: UserLive): Promise<void>;
    search(id: UserLiveId): Promise<Nullable<UserLive>>;
    searchAll(): Promise<Array<UserLive>>;
    searchAllNotActive(): Promise<Array<UserLive>>;
}
