import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserTokenFirebase extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
