import { AuthEmail } from './AuthEmail';
import { AuthPassword } from './AuthPassword';

export class AuthUser {
  readonly email: AuthEmail;
  readonly password: AuthPassword;

  constructor(email: AuthEmail, password: AuthPassword) {
    this.email = email;
    this.password = password;
  }

  public passwordMatches(password: AuthPassword): boolean {
    return this.password.value === password.value;
  }
}
