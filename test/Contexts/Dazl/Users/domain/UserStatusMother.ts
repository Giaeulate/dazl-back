import { WordMother } from '../../../Shared/domain/WordMother';
import { UserStatus } from '../../../../../src/Contexts/Dazl/users/domain/UserStatus';

export class UserStatusMother {
  static create(value: string): UserStatus {
    return new UserStatus(value);
  }

  static random(): UserStatus {
    return this.create(WordMother.random());
  }
}
