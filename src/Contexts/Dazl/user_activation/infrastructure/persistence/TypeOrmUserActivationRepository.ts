import { DataSource, EntitySchema, Equal, EqualOperator } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserActivationEntity } from './typeorm/UserActivationEntity';

import { InjectDataSource } from '@nestjs/typeorm';
import { UserActivation } from '../../domain/UserActivation';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationId } from '../../domain/UserActivationId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserId } from '../../../users/domain/UserId';
import { UserActivationActive } from '../../domain/UserActivationActive';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { UserActivationSocketId } from '../../domain/UserActivationSocketId';

@Injectable()
export class TypeOrmUserActivationRepository
  extends TypeOrmRepository<UserActivation>
  implements UserActivationRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<UserActivation> {
    return UserActivationEntity;
  }

  public async save(userActivation: UserActivation): Promise<void> {
    await this.persist(userActivation);
  }

  public async search(id: UserActivationId): Promise<Nullable<UserActivation>> {
    const repository = await this.repository();
    return await repository.findOne({ where: { id: Equal(id) } });
  }

  public async searchAll(): Promise<Nullable<UserActivation[]>> {
    const repository = await this.repository();
    return await repository.find();
  }

  public async searchAllByUserId(
    userId: UserId,
  ): Promise<Nullable<UserActivation[]>> {
    const repository = await this.repository();
    return await repository.find({
      where: { userId: new EqualOperator(userId) },
    });
  }

  public async saveAll(userActivations: UserActivation[]): Promise<void> {
    const repository = await this.repository();
    await repository.save(userActivations);
  }

  public async searchByUserIdAndActive(
    id: UserId,
  ): Promise<Nullable<UserActivation>> {
    const repository = await this.repository();
    const userActivation = await repository.findOne({
      where: {
        userId: Equal(id),
        active: Equal(new UserActivationActive(IsBoolean.TRUE)),
      },
    });
    return userActivation ? userActivation : null;
  }

  public async searchBySocketId(
    id: UserActivationSocketId,
  ): Promise<Nullable<UserActivation>> {
    const repository = await this.repository();
    return repository.findOne({
      where: {
        socketId: new EqualOperator(id),
      },
    });
  }

  public async searchAllActive(): Promise<Array<UserActivation>> {
    const repository = await this.repository();
    return repository.find({
      where: {
        active: Equal(new UserActivationActive(IsBoolean.TRUE)),
      },
    });
  }
}
