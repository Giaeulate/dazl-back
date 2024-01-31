import { AuthEmail } from '../../../../../src/Contexts/Dazl/auth/domain/AuthEmail';
import { AuthPassword } from '../../../../../src/Contexts/Dazl/auth/domain/AuthPassword';
import { AuthEmailMother } from '../domain/AuthEmailMother';
import { AuthPasswordMother } from '../domain/AuthPasswordMother';

export class UserLoginRequestMother {
  static create(
    email: AuthEmail,
    password: AuthPassword,
  ): UserLoginRequestMother {
    return {
      email: email?.value,
      password: password?.value,
    };
  }

  static random(): UserLoginRequestMother {
    return this.create(AuthEmailMother.random(), AuthPasswordMother.random());
  }
}
