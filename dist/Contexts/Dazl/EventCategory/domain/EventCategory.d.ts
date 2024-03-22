import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { EventCategoryId } from './EventCategoryId';
import { EventCategoryName } from './EventCategoryName';
export declare class EventCategory extends AggregateRoot {
    readonly id: EventCategoryId;
    readonly name: EventCategoryName;
    readonly createdAt: CreatedAt;
    readonly updatedAt: UpdatedAt;
    constructor(id: EventCategoryId, name: EventCategoryName, createdAt: CreatedAt, updatedAt: UpdatedAt);
    toPrimitives(): any;
}
