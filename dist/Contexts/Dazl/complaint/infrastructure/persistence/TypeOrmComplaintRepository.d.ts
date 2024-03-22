import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Complaint } from '../../domain/Complaint';
import { ComplaintRepository } from '../../domain/ComplaintRepository';
import { DataSource, EntitySchema } from 'typeorm';
export declare class TypeOrmComplaintRepository extends TypeOrmRepository<Complaint> implements ComplaintRepository {
    private dataSource;
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<Complaint>;
    save(complaint: Complaint): Promise<void>;
}
