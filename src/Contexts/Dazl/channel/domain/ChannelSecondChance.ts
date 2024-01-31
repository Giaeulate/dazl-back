import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class ChannelSecondChance extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}

export const enum ChannelSecondChanceTypes {
  NEUTRAL = 'neutral',
  ACCEPTED = 'accept',
  REJECT = 'reject',
}
