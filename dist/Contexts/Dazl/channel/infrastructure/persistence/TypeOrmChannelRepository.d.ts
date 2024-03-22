import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Channel } from '../../domain/Channel';
import { ChannelRepository } from '../../domain/ChannelRepository';
import { DataSource, EntitySchema } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { ChannelId } from '../../domain/ChannelId';
export declare class TypeOrmChannelRepository extends TypeOrmRepository<Channel> implements ChannelRepository {
    private dataSource;
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<Channel>;
    save(channel: Channel): Promise<void>;
    search(id: ChannelId): Promise<Nullable<Channel>>;
    searchAll(): Promise<Array<Channel>>;
}
