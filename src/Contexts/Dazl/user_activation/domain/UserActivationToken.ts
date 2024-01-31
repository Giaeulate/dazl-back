import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserActivationToken extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
