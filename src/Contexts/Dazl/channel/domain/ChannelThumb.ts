import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class ChannelThumb extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
  }
}
