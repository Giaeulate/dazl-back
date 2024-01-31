import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class CountryId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
