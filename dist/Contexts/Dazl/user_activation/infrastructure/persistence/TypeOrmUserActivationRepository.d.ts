import { DataSource, EntitySchema } from 'typeorm';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserActivation } from '../../domain/UserActivation';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationId } from '../../domain/UserActivationId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserId } from '../../../users/domain/UserId';
import { UserActivationSocketId } from '../../domain/UserActivationSocketId';
export declare class TypeOrmUserActivationRepository extends TypeOrmRepository<UserActivation> implements UserActivationRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<UserActivation>;
    save(userActivation: UserActivation): Promise<void>;
    search(id: UserActivationId): Promise<Nullable<UserActivation>>;
    searchAll(): Promise<Nullable<UserActivation[]>>;
    searchAllByUserId(userId: UserId): Promise<Nullable<UserActivation[]>>;
    saveAll(userActivations: UserActivation[]): Promise<void>;
    searchByUserIdAndActive(id: UserId): Promise<Nullable<UserActivation>>;
    searchBySocketId(id: UserActivationSocketId): Promise<Nullable<UserActivation>>;
    searchAllActive(): Promise<Array<UserActivation>>;
}
