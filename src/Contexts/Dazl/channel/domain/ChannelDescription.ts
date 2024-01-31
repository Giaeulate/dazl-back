import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class ChannelDescription extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
  }
}
