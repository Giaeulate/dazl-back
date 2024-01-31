import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class ChannelId extends Uuid {
  constructor(public readonly value: string) {
    super(value);
  }
}
