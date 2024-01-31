import { WordMother } from '../../../Shared/domain/WordMother';
import { UserConfirmationCode } from '../../../../../src/Contexts/Dazl/users/domain/UserConfirmationCode';

export class UserConfirmationCodeMother {
  static create(value: string): UserConfirmationCode {
    return new UserConfirmationCode(value);
  }

  static random(): UserConfirmationCode {
    return this.create(WordMother.random());
  }
}
