import { WordMother } from '../../../Shared/domain/WordMother';
import { UserLatitude } from '../../../../../src/Contexts/Dazl/users/domain/UserLatitude';

export class UserLatitudeMother {
  static create(value: string): UserLatitude {
    return new UserLatitude(value);
  }

  static random(): UserLatitude {
    return this.create(String(WordMother.numberRandom()));
  }
}
