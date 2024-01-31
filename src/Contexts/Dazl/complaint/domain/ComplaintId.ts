import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class ComplaintId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
