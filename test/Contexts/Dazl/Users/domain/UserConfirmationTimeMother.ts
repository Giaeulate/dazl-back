import { WordMother } from '../../../Shared/domain/WordMother';
import { UserConfirmationTime } from '../../../../../src/Contexts/Dazl/users/domain/UserConfirmationTime';

export class UserConfirmationTimeMother {
  static create(value: string): UserConfirmationTime {
    return new UserConfirmationTime(value);
  }

  static random(): UserConfirmationTime {
    return this.create(WordMother.random());
  }
}
