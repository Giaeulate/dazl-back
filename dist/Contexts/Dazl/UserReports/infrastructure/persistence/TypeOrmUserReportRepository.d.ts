import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserReport } from '../../domain/UserReport';
import { UserReportRepository } from '../../domain/UserReportRepository';
import { DataSource, EntitySchema } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserReportId } from '../../domain/UserReportId';
import { UserId } from '../../../users/domain/UserId';
export declare class TypeOrmUserReportRepository extends TypeOrmRepository<UserReport> implements UserReportRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<UserReport>;
    save(userReport: UserReport): Promise<void>;
    search(id: UserReportId): Promise<Nullable<UserReport>>;
    searchAll(): Promise<Array<UserReport>>;
    searchByUser(userId: UserId): Promise<Array<UserReport>>;
}
