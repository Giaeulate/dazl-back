import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserReport } from '../../domain/UserReport';
import { UserReportRepository } from '../../domain/UserReportRepository';
import { Injectable } from '@nestjs/common';
import { DataSource, EntitySchema, Equal } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserReportId } from '../../domain/UserReportId';
import { UserReportEntity } from './typeorm/UserReportEntity';
import { UserId } from '../../../users/domain/UserId';

@Injectable()
export class TypeOrmUserReportRepository
  extends TypeOrmRepository<UserReport>
  implements UserReportRepository
{
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<UserReport> {
    return UserReportEntity;
  }

  public async save(userReport: UserReport): Promise<void> {
    await this.persist(userReport);
  }

  public async search(id: UserReportId): Promise<Nullable<UserReport>> {
    const repository = await this.repository();
    const userReport = await repository.findOne({
      where: { id: Equal(id) },
    });
    return userReport ? userReport : null;
  }

  public async searchAll(): Promise<Array<UserReport>> {
    const repository = await this.repository();
    return await repository.find();
  }

  public async searchByUser(userId: UserId): Promise<Array<UserReport>> {
    const repository = await this.repository();
    const userReports = await repository.find({
      where: {
        userWhoReported: Equal(userId),
      },
    });
    return userReports ? userReports : [];
  }
}
