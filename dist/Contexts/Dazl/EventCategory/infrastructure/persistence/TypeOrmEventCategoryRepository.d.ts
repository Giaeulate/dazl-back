import { EventCategoryRepository } from '../../domain/EventCategoryRepository';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { DataSource, EntitySchema } from 'typeorm';
import { EventCategoryId } from '../../domain/EventCategoryId';
import { EventCategory } from '../../domain/EventCategory';
import { Nullable } from '../../../../Shared/domain/Nullable';
export declare class TypeOrmEventCategoryRepository extends TypeOrmRepository<EventCategory> implements EventCategoryRepository {
    constructor(dataSource: DataSource);
    protected entitySchema(): EntitySchema<EventCategory>;
    search(id: EventCategoryId): Promise<Nullable<EventCategory>>;
    searchAll(): Promise<Array<EventCategory>>;
}
