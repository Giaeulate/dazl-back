import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { ChannelUser } from '../../domain/ChannelUser';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { ChannelUserId } from '../../domain/ChannelUserId';
import { DataSource, EntitySchema, Equal, EqualOperator } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { InjectDataSource } from '@nestjs/typeorm';
import { ChannelUserEntity } from './typeorm/ChannelUserEntity';
import { Injectable } from '@nestjs/common';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ChannelId } from '../../../channel/domain/ChannelId';

@Injectable()
export class TypeOrmChannelUserRepository
  extends TypeOrmRepository<ChannelUser>
  implements ChannelUserRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<ChannelUser> {
    return ChannelUserEntity;
  }

  public async save(channelUser: ChannelUser): Promise<void> {
    return await this.persist(channelUser);
  }

  public async search(id: ChannelUserId): Promise<Nullable<ChannelUser>> {
    const repository = await this.repository();
    const channelUser = await repository.findOne({
      where: { id: new EqualOperator(id) },
    });
    return channelUser ? channelUser : null;
  }

  public async searchByUserActivationId(
    userActivationId: UserActivationId,
  ): Promise<Nullable<Array<ChannelUser>>> {
    const repository = await this.repository();
    return await repository.find({
      where: { userActivationId: new EqualOperator(userActivationId) },
    });
  }

  public async searchByChannelId(
    channelId: ChannelId,
  ): Promise<Nullable<Array<ChannelUser>>> {
    const repository = await this.repository();
    return await repository.find({
      where: { channelId: new EqualOperator(channelId) },
    });
  }

  public async searchByChannelIdAndUserActivationId(
    channelId: ChannelId,
    userActivationId: UserActivationId,
  ): Promise<Nullable<ChannelUser>> {
    const repository = await this.repository();
    return await repository.findOne({
      where: {
        channelId: Equal(channelId),
        userActivationId: Equal(userActivationId),
      },
    });
  }
}
