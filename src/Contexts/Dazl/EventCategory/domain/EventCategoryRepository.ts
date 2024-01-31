import { EventCategory } from './EventCategory';
import { EventCategoryId } from './EventCategoryId';
import { Nullable } from '../../../Shared/domain/Nullable';

export interface EventCategoryRepository {
  searchAll(): Promise<Array<EventCategory>>;
  search(id: EventCategoryId): Promise<Nullable<EventCategory>>;
}
