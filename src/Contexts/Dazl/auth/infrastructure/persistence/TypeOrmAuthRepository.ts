import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { User } from '../../../users/domain/User';
import { DataSource, EntitySchema, Equal, EqualOperator } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { AuthUserRepository } from '../../domain/AuthRepository';
import { AuthEmail } from '../../domain/AuthEmail';
import { UserEntity } from '../../../users/infrastructure/persistence/typeorm/UserEntity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserActive } from '../../../users/domain/UserActive';

@Injectable()
export class TypeOrmAuthRepository
  extends TypeOrmRepository<User>
  implements AuthUserRepository
{
  private readonly logger = new Logger(TypeOrmAuthRepository.name);

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<User> {
    return UserEntity;
  }

  public async search(email: AuthEmail): Promise<Nullable<User>> {
    const repository = await this.repository();
    const user = await repository.findOne({
      select: ['id', 'email', 'gender', 'password', 'isEmailConfirmed'],
      where: {
        email: new EqualOperator(email),
        active: Equal(UserActive.active()),
      },
    });
    return user ? user : null;
  }
}
