import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class MessageType extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}

export enum MessageTypeEnum {
  TEXT = 'text',
  IMAGE = 'image',
  RESPONSE = 'response',
  VIDEO = 'video',
  AUDIO = 'audio',
  FILE = 'file',
}
