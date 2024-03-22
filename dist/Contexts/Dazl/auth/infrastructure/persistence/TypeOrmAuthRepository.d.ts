import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { User } from '../../../users/domain/User';
import { DataSource, EntitySchema } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { AuthUserRepository } from '../../domain/AuthRepository';
import { AuthEmail } from '../../domain/AuthEmail';
export declare class TypeOrmAuthRepository extends TypeOrmRepository<User> implements AuthUserRepository {
    private readonly logger;
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<User>;
    search(email: AuthEmail): Promise<Nullable<User>>;
}
