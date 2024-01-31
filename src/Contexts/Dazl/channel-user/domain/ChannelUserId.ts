import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class ChannelUserId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
