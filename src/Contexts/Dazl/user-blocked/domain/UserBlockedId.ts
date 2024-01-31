import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class UserBlockedId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
