import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { InvitationRepository } from '../../domain/InvitationRepository';
import { Invitation } from '../../domain/Invitation';
import { DataSource, EntitySchema, EqualOperator } from 'typeorm';
import { InvitationEntity } from './typeorm/InvitationEntity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { InvitationId } from '../../domain/InvitationId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';

@Injectable()
export class TypeOrmInvitationRepository
  extends TypeOrmRepository<Invitation>
  implements InvitationRepository
{
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<Invitation> {
    return InvitationEntity;
  }

  public async save(invitation: Invitation): Promise<void> {
    await this.persist(invitation);
  }

  public async search(id: InvitationId): Promise<Nullable<Invitation>> {
    const repository = await this.repository();
    return await repository.findOne({
      where: { id: new EqualOperator(id) },
    });
  }

  public async searchAll(): Promise<Nullable<Invitation[]>> {
    const repository = await this.repository();
    return await repository.find();
  }

  async searchAllByUserActivation(
    to: UserActivationId,
    from: UserActivationId,
  ): Promise<Nullable<Invitation[]>> {
    const repository = await this.repository();
    return await repository.find({
      where: {
        userActivationToId: new EqualOperator(to),
        userActivationFromId: new EqualOperator(from),
      },
    });
  }

  public async searchAllByUserActivationFrom(
    from: UserActivationId,
  ): Promise<Array<Invitation>> {
    const repository = await this.repository();
    return await repository.find({
      where: { userActivationFromId: new EqualOperator(from) },
    });
  }

  public async searchAllByUserActivationTo(
    to: UserActivationId,
  ): Promise<Array<Invitation>> {
    const repository = await this.repository();
    return await repository.find({
      where: { userActivationToId: new EqualOperator(to) },
    });
  }
}
