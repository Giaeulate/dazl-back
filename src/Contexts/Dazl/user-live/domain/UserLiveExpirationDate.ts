import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserLiveExpirationDate extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
