import { EntitySchema } from 'typeorm';
import { EventCategory } from '../../../domain/EventCategory';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { EventCategoryName } from '../../../domain/EventCategoryName';
import { EventCategoryId } from '../../../domain/EventCategoryId';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';

export const EventCategoryEntity = new EntitySchema<EventCategory>({
  name: 'EventCategory',
  target: EventCategory,
  tableName: 'event_categories',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(EventCategoryId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(EventCategoryName),
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(CreatedAt),
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(UpdatedAt),
    },
  },
});
