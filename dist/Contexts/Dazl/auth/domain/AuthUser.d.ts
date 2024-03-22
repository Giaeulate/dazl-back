import { AuthEmail } from './AuthEmail';
import { AuthPassword } from './AuthPassword';
export declare class AuthUser {
    readonly email: AuthEmail;
    readonly password: AuthPassword;
    constructor(email: AuthEmail, password: AuthPassword);
    passwordMatches(password: AuthPassword): boolean;
}
