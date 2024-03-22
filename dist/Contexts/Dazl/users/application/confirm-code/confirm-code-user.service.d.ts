import { UserRepository } from '../../domain/UserRepository';
export declare class ConfirmCodeUserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    run(code: string, email: string): Promise<string>;
    private ensureUserEmailExist;
    private ensureCodeIsValid;
}
