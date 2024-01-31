import { Injectable } from '@nestjs/common';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Channel } from '../../domain/Channel';
import { ChannelRepository } from '../../domain/ChannelRepository';
import { DataSource, EntitySchema, EqualOperator } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { ChannelId } from '../../domain/ChannelId';
import { ChannelEntity } from './typeorm/ChannelEntity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmChannelRepository
  extends TypeOrmRepository<Channel>
  implements ChannelRepository
{
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<Channel> {
    return ChannelEntity;
  }

  public async save(channel: Channel): Promise<void> {
    await this.persist(channel);
  }

  public async search(id: ChannelId): Promise<Nullable<Channel>> {
    const repository = await this.repository();
    return await repository.findOne({
      where: { id: new EqualOperator(id) },
    });
  }

  public async searchAll(): Promise<Array<Channel>> {
    const repository = await this.repository();
    return await repository.find();
  }
}
