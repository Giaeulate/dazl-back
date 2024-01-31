import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserActivationImage extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
  }
}
