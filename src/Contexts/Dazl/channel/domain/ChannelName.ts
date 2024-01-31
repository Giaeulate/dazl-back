import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class ChannelName extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
