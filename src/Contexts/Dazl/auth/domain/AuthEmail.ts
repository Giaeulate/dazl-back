import { UserEmail } from '../../users/domain/UserEmail';

export class AuthEmail extends UserEmail {
  constructor(value: string) {
    super(value);
  }
}
