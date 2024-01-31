import { UserPassword } from '../../users/domain/UserPassword';

export class AuthPassword extends UserPassword {
  constructor(value: string) {
    super(value);
  }
}
