import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { UserId } from '../../domain/UserId';
import { Criteria } from '../../../../Shared/domain/Criteria';
import { UserEmail } from '../../domain/UserEmail';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserTokenFirebase } from '../../domain/UserTokenFirebase';

export class UserRepositoryInMemory implements UserRepository {
  private readonly users = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async search(id: UserId): Promise<User | undefined> {
    return this.users.find((user) => user.id.value === id.value);
  }

  searchByCriteria(criteria: Criteria): Promise<Nullable<User>> {
    return Promise.resolve(undefined);
  }

  searchByEmail(email: UserEmail): Promise<Nullable<User>> {
    return Promise.resolve(undefined);
  }

  searchAll(): Promise<Array<User>> {
    return Promise.resolve(undefined);
  }

  searchByToken(email: UserTokenFirebase): Promise<Nullable<User>> {
    return Promise.resolve(undefined);
  }
}
