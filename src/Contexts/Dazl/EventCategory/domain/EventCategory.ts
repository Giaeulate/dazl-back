import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { EventCategoryId } from './EventCategoryId';
import { EventCategoryName } from './EventCategoryName';

export class EventCategory extends AggregateRoot {
  readonly id: EventCategoryId;
  readonly name: EventCategoryName;
  readonly createdAt: CreatedAt;
  readonly updatedAt: UpdatedAt;

  constructor(
    id: EventCategoryId,
    name: EventCategoryName,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
