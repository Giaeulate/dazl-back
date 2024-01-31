import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class UserLiveId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
