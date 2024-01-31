import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { BadRequestException } from '@nestjs/common';

export class UserActivationDetails extends StringValueObject {
  constructor(public readonly value: string) {
    super(value);
  }

  static checkForbiddenTerms(
    forbiddenTerms: string[],
    value: string,
  ): UserActivationDetails {
    for (const term of forbiddenTerms) {
      if (value.toLowerCase().includes(term.toLowerCase())) {
        throw new BadRequestException(
          `El texto proporcionada no puede contener un término prohibido: "${term}"`,
        );
      }
    }
    return new UserActivationDetails(value);
  }
}
