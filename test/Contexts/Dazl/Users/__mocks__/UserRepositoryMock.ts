import { User } from '../../../../../src/Contexts/Dazl/users/domain/User';
import { UserRepository } from '../../../../../src/Contexts/Dazl/users/domain/UserRepository';
import { UserId } from '../../../../../src/Contexts/Dazl/users/domain/UserId';
import { Criteria } from '../../../../../src/Contexts/Shared/domain/Criteria';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import { UserEmail } from '../../../../../src/Contexts/Dazl/users/domain/UserEmail';

export class UserRepositoryMock implements UserRepository {
  private mockSave = jest.fn();

  async save(user: User): Promise<void> {
    this.mockSave(user);
  }

  assertLastSavedUserIs(expected: User): void {
    const mock = this.mockSave.mock;
    const lastSavedCourse = mock.calls[mock.calls.length - 1][0] as User;
    expect(lastSavedCourse).toBeInstanceOf(User);
    expect(lastSavedCourse.email).toEqual(expected.email);
    expect(lastSavedCourse.createdAt).toBeDefined();
  }

  search(id: UserId): Promise<User | undefined> {
    return Promise.resolve(undefined);
  }

  searchByCriteria(criteria: Criteria): Promise<Nullable<User>> {
    return Promise.resolve(undefined);
  }

  searchByEmail(email: UserEmail): Promise<Nullable<User>> {
    return Promise.resolve(undefined);
  }
}
