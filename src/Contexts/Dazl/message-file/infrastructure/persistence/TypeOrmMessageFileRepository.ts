import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { MessageFile } from '../../domain/MessageFile';
import { MessageFileRepository } from '../../domain/MessageFileRepository';
import { Injectable } from '@nestjs/common';
import { MessageFileEntity } from './typeorm/MessageFileEntity';
import { DataSource, EntitySchema, EqualOperator } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MessageFileId } from '../../domain/MessageFileId';
import { InjectDataSource } from '@nestjs/typeorm';
import { MessageId } from '../../../message/domain/MessageId';

@Injectable()
export class TypeOrmMessageFileRepository
  extends TypeOrmRepository<MessageFile>
  implements MessageFileRepository
{
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<MessageFile> {
    return MessageFileEntity;
  }

  public async save(messageFile: MessageFile): Promise<void> {
    await this.persist(messageFile);
  }

  public async search(id: MessageFileId): Promise<Nullable<MessageFile>> {
    const repository = await this.repository();
    const messageFile = await repository.findOne({
      where: { id: new EqualOperator(id) },
    });
    return messageFile ? messageFile : null;
  }

  public async searchByMessageId(
    messageId: MessageId,
  ): Promise<Nullable<MessageFile>> {
    const repository = await this.repository();
    const messageFile = await repository.findOne({
      where: { messageId: new EqualOperator(messageId) },
    });
    return messageFile ? messageFile : null;
  }
}
