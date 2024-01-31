import { AuthEmail } from '../../../../../src/Contexts/Dazl/auth/domain/AuthEmail';
import { WordMother } from '../../../Shared/domain/WordMother';

export class AuthEmailMother {
  static create(value: string): AuthEmail {
    return new AuthEmail(value);
  }

  static random(): AuthEmail {
    return this.create(WordMother.randomEmail());
  }
}
