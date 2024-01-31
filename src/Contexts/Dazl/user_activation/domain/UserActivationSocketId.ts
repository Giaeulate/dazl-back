import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class UserActivationSocketId extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
  }
}
