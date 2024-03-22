import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Message } from '../../domain/Message';
import { MessageRepository } from '../../domain/MessageRepository';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { DataSource, EntitySchema } from 'typeorm';
import { MessageId } from '../../domain/MessageId';
import { ChannelId } from '../../../channel/domain/ChannelId';
export declare class TypeOrmMessageRepository extends TypeOrmRepository<Message> implements MessageRepository {
    private dataSource;
    constructor(dataSource: DataSource);
    save(message: Message): Promise<void>;
    search(id: MessageId): Promise<Nullable<Message>>;
    protected entitySchema(): EntitySchema<Message>;
    searchByChannelId(channelId: ChannelId): Promise<Nullable<Message[]>>;
}
