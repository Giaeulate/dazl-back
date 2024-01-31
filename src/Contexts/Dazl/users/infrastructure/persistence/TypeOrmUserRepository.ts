import { UserRepository } from '../../domain/UserRepository';

import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { DataSource, EntitySchema, Equal, EqualOperator } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { Injectable } from '@nestjs/common';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserEntity } from './typeorm/UserEntity';
import { UserEmail } from '../../domain/UserEmail';
import { InjectDataSource } from '@nestjs/typeorm';
import { Criteria } from '../../../../Shared/domain/Criteria';
import { UserActive } from '../../domain/UserActive';
import { UserTokenFirebase } from '../../domain/UserTokenFirebase';

@Injectable()
export class TypeOrmUserRepository
  extends TypeOrmRepository<User>
  implements UserRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }

  public searchByCriteria(criteria: Criteria): Promise<User> {
    throw new Error('Method not implemented.');
  }

  public async search(id: UserId): Promise<Nullable<User>> {
    const repository = await this.repository();
    const user = await repository.findOne({
      where: { id: Equal(id), active: Equal(UserActive.active()) },
    });
    return user ? user : null;
  }

  public async searchByEmail(email: UserEmail): Promise<Nullable<User>> {
    const repository = await this.repository();
    return await repository.findOne({
      where: {
        email: new EqualOperator(email),
        active: Equal(UserActive.active()),
      },
    });
  }

  public async save(user: User): Promise<void> {
    await this.persist(user);
  }

  protected entitySchema(): EntitySchema<User> {
    return UserEntity;
  }

  public async searchAll(): Promise<Array<User>> {
    const repository = await this.repository();
    return await repository.find({
      where: { active: Equal(UserActive.active()) },
    });
  }

  public async searchByToken(
    token: UserTokenFirebase,
  ): Promise<Nullable<User>> {
    const repository = await this.repository();
    const user = await repository.findOne({
      where: {
        tokenFirebase: Equal(token),
        active: Equal(UserActive.active()),
      },
    });
    return user ? user : null;
  }
}
