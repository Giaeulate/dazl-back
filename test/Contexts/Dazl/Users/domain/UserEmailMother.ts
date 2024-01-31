import { WordMother } from '../../../Shared/domain/WordMother';
import { UserEmail } from '../../../../../src/Contexts/Dazl/users/domain/UserEmail';

export class UserEmailMother {
  static create(value: string): UserEmail {
    return new UserEmail(value);
  }

  static random(): UserEmail {
    return this.create(WordMother.randomEmail());
  }
}
