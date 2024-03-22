import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { MessageFile } from '../../domain/MessageFile';
import { MessageFileRepository } from '../../domain/MessageFileRepository';
import { DataSource, EntitySchema } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MessageFileId } from '../../domain/MessageFileId';
import { MessageId } from '../../../message/domain/MessageId';
export declare class TypeOrmMessageFileRepository extends TypeOrmRepository<MessageFile> implements MessageFileRepository {
    private dataSource;
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<MessageFile>;
    save(messageFile: MessageFile): Promise<void>;
    search(id: MessageFileId): Promise<Nullable<MessageFile>>;
    searchByMessageId(messageId: MessageId): Promise<Nullable<MessageFile>>;
}
