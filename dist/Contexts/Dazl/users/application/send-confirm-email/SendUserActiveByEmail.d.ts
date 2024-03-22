import { UserRepository } from '../../domain/UserRepository';
import { UserActiveEmailSender } from './UserActiveEmailSender';
type Params = {
    email: string;
};
export declare class SendUserActiveByEmail {
    private readonly userRepository;
    private readonly sender;
    constructor(userRepository: UserRepository, sender: UserActiveEmailSender);
    run({ email }: Params): Promise<void>;
}
export {};
