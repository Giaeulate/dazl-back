import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class EventId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
