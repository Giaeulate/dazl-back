import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';

export class ChannelActive extends NumberValueObject {
  constructor(public readonly value: number) {
    super(value);
  }

  isActive(): boolean {
    return this.value === 1;
  }
}
