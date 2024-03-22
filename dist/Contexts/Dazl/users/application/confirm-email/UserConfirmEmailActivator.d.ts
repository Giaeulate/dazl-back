import { UserRepository } from '../../domain/UserRepository';
type Params = {
    email: string;
    code: string;
};
export declare class UserConfirmEmailActivator {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    run({ email, code }: Params): Promise<void>;
}
export {};
