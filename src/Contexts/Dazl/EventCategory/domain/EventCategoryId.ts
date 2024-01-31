import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class EventCategoryId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
