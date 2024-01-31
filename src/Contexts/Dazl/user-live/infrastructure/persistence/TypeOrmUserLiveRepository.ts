import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserLive } from '../../domain/UserLive';
import { UserLiveRepository } from '../../domain/UserLiveRepository';
import { Injectable } from '@nestjs/common';
import { DataSource, EntitySchema, Equal, Not } from 'typeorm';
import { UserLiveId } from '../../domain/UserLiveId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserLiveEntity } from './typeorm/UserLiveEntity';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserLiveActive } from '../../domain/UserLiveActive';

@Injectable()
export class TypeOrmUserLiveRepository
  extends TypeOrmRepository<UserLive>
  implements UserLiveRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }
  protected entitySchema(): EntitySchema<UserLive> {
    return UserLiveEntity;
  }

  public async save(userLive: UserLive): Promise<void> {
    await this.persist(userLive);
  }

  public async search(id: UserLiveId): Promise<Nullable<UserLive>> {
    const repository = await this.repository();
    const userLive = await repository.findOneBy({
      id: Equal(id),
    });
    return userLive ? userLive : null;
  }

  public async searchAll(): Promise<Array<UserLive>> {
    const repository = await this.repository();
    const userLives = await repository.find();
    return userLives ? userLives : [];
  }

  public async searchAllNotActive(): Promise<Array<UserLive>> {
    const repository = await this.repository();
    const userLives = await repository.find({
      where: {
        active: Not(new UserLiveActive(1)),
      },
    });
    return userLives ? userLives : [];
  }
}
