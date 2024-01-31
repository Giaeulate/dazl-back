import { Injectable } from '@nestjs/common';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Complaint } from '../../domain/Complaint';
import { ComplaintRepository } from '../../domain/ComplaintRepository';
import { DataSource, EntitySchema } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ComplaintEntity } from './typeorm/ComplaintEntity';

@Injectable()
export class TypeOrmComplaintRepository
  extends TypeOrmRepository<Complaint>
  implements ComplaintRepository
{
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource);
  }

  protected entitySchema(): EntitySchema<Complaint> {
    return ComplaintEntity;
  }

  async save(complaint: Complaint): Promise<void> {
    await this.persist(complaint);
  }
}
