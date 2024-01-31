import { Nullable } from '../../../Shared/domain/Nullable';
import { AuthEmail } from './AuthEmail';
import { User } from '../../users/domain/User';

export interface AuthUserRepository {
  search(email: AuthEmail): Promise<Nullable<User>>;
}
