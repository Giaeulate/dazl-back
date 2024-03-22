import { AggregateRoot } from '../../../domain/AggregateRoot';
import { DataSource, EntitySchema, Repository } from 'typeorm';
export declare abstract class TypeOrmRepository<T extends AggregateRoot> {
    protected _client: DataSource;
    protected abstract entitySchema(): EntitySchema<T>;
    protected constructor(client: DataSource);
    protected persist(aggregateRoot: T): Promise<void>;
    protected repository(): Promise<Repository<T>>;
}
