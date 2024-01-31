import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Message } from '../../domain/Message';
import { MessageRepository } from '../../domain/MessageRepository';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { DataSource, EntitySchema, EqualOperator } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { MessageId } from '../../domain/MessageId';
import { MessageEntity } from './typeorm/MessageEntity';
import { ChannelId } from '../../../channel/domain/ChannelId';

@Injectable()
export class TypeOrmMessageRepository
  extends TypeOrmRepository<Message>
  implements MessageRepository
{
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource);
  }

  async save(message: Message): Promise<void> {
    await this.persist(message);
  }

  async search(id: MessageId): Promise<Nullable<Message>> {
    const repository = await this.repository();
    return await repository.findOne({
      where: {
        id: new EqualOperator(id),
      },
    });
  }

  protected entitySchema(): EntitySchema<Message> {
    return MessageEntity;
  }

  async searchByChannelId(channelId: ChannelId): Promise<Nullable<Message[]>> {
    const repository = await this.repository();
    return await repository.find({
      where: {
        channelId: new EqualOperator(channelId),
      },
      order: {
        updatedAt: 'ASC',
      },
    });
  }
}
