import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Event } from '../../domain/Event';
import { EventRepository } from '../../domain/EventRepository';
import { DataSource, EntitySchema } from 'typeorm';
export declare class TypeOrmEventRepository extends TypeOrmRepository<Event> implements EventRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<Event>;
    save(event: Event): Promise<void>;
    searchActive(): Promise<Array<Event>>;
}
