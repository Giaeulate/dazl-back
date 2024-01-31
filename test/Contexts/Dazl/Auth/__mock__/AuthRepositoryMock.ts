import { AuthUserRepository } from '../../../../../src/Contexts/Dazl/auth/domain/AuthRepository';
import { AuthEmail } from '../../../../../src/Contexts/Dazl/auth/domain/AuthEmail';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import { User } from '../../../../../src/Contexts/Dazl/users/domain/User';

export class AuthRepositoryMock implements AuthUserRepository {
  private mockSave = jest.fn();

  search(email: AuthEmail): Promise<Nullable<User>> {
    return Promise.resolve(undefined);
  }
}
