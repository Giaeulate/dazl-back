import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserBlocked } from '../../domain/UserBlocked';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
import { Injectable } from '@nestjs/common';
import { DataSource, EntitySchema, Equal } from 'typeorm';
import { UserBlockedId } from '../../domain/UserBlockedId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserBlockedEntity } from './typeorm/UserBlockedEntity';
import { UserId } from '../../../users/domain/UserId';

@Injectable()
export class TypeOrmUserBlockedRepository
  extends TypeOrmRepository<UserBlocked>
  implements UserBlockedRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }
  protected entitySchema(): EntitySchema<UserBlocked> {
    return UserBlockedEntity;
  }

  public async save(userBlocked: UserBlocked): Promise<void> {
    await this.persist(userBlocked);
  }

  public async search(id: UserBlockedId): Promise<Nullable<UserBlocked>> {
    const repository = await this.repository();
    const userBlocked = await repository.findOneBy({
      id: Equal(id),
    });
    return userBlocked ? userBlocked : null;
  }

  public async searchAll(): Promise<Array<UserBlocked>> {
    const repository = await this.repository();
    const userBlockeds = await repository.find();
    return userBlockeds ? userBlockeds : [];
  }

  public async searchByUserWhoBlockedIdAnd(
    userWhoBlockedId: UserId,
    userBlockedId: UserId,
  ): Promise<Array<UserBlocked>> {
    const repository = await this.repository();
    const userBlockeds = await repository.find({
      where: {
        userWhoBlocked: Equal(userWhoBlockedId),
        userBlocked: Equal(userBlockedId),
      },
    });
    return userBlockeds ? userBlockeds : [];
  }
}
