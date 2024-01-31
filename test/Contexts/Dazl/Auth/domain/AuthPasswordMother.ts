import { AuthPassword } from '../../../../../src/Contexts/Dazl/auth/domain/AuthPassword';
import { WordMother } from '../../../Shared/domain/WordMother';

export class AuthPasswordMother {
  static create(value: string): AuthPassword {
    return new AuthPassword(value);
  }

  static random(): AuthPassword {
    return this.create(WordMother.randomPassword());
  }
}
