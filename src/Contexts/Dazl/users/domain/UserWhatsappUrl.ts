import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { BadRequestException } from '@nestjs/common';

export class UserWhatsappUrl extends StringValueObject {
  constructor(value: string) {
    super(value);
    // this.ensureIsValidUrl(value);
  }

  private ensureIsValidUrl(value: string) {
    const urlRegex =
      /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9\-]+(?:\.[a-z0-9\-]+)+\S*$/i;
    if (!urlRegex.test(value)) {
      throw new BadRequestException(`The value <${value}> is not a valid URL.`);
    }
  }
}
