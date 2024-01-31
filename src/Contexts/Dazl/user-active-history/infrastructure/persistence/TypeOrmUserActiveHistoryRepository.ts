import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserActiveHistoryRepository } from '../../domain/UserActiveHistoryRepository';
import { UserActiveHistory } from '../../domain/UserActiveHistory';
import { Injectable } from '@nestjs/common';
import { DataSource, EntitySchema, EqualOperator } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserActiveHistoryId } from '../../domain/UserActiveHistoryId';
import { UserActiveHistoryEntity } from './typeorm/UserActiveHistoryEntity';
import { UserId } from '../../../users/domain/UserId';

@Injectable()
export class TypeOrmUserActiveHistoryRepository
  extends TypeOrmRepository<UserActiveHistory>
  implements UserActiveHistoryRepository
{
  constructor(@InjectDataSource() client: DataSource) {
    super(client);
  }

  async save(userActiveHistory: UserActiveHistory): Promise<void> {
    await this.persist(userActiveHistory);
  }

  async search(id: UserActiveHistoryId): Promise<UserActiveHistory> {
    const repository = await this.repository();
    return await repository.findOne({
      where: { id: new EqualOperator(id) },
    });
  }

  async searchAll(): Promise<Array<UserActiveHistory>> {
    const repository = await this.repository();
    return await repository.find();
  }

  protected entitySchema(): EntitySchema<UserActiveHistory> {
    return UserActiveHistoryEntity;
  }

  async searchAllByUserId(userId: UserId): Promise<Array<UserActiveHistory>> {
    const repository = await this.repository();
    return await repository.find({
      where: { userId: new EqualOperator(userId) },
    });
  }
}
