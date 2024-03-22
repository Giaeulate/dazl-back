import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { ChannelUser } from '../../domain/ChannelUser';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { ChannelUserId } from '../../domain/ChannelUserId';
import { DataSource, EntitySchema } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ChannelId } from '../../../channel/domain/ChannelId';
export declare class TypeOrmChannelUserRepository extends TypeOrmRepository<ChannelUser> implements ChannelUserRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<ChannelUser>;
    save(channelUser: ChannelUser): Promise<void>;
    search(id: ChannelUserId): Promise<Nullable<ChannelUser>>;
    searchByUserActivationId(userActivationId: UserActivationId): Promise<Nullable<Array<ChannelUser>>>;
    searchByChannelId(channelId: ChannelId): Promise<Nullable<Array<ChannelUser>>>;
    searchByChannelIdAndUserActivationId(channelId: ChannelId, userActivationId: UserActivationId): Promise<Nullable<ChannelUser>>;
}
