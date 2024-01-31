import { WordMother } from '../../../Shared/domain/WordMother';
import { UserLongitude } from '../../../../../src/Contexts/Dazl/users/domain/UserLongitude';

export class UserLongitudeMother {
  static create(value: string): UserLongitude {
    return new UserLongitude(value);
  }

  static random(): UserLongitude {
    return this.create(String(WordMother.numberRandom()));
  }
}
