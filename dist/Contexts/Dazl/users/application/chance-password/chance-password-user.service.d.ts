import { UserRepository } from '../../domain/UserRepository';
import { RequestChancePasswordDto } from './dto/RequestChancePasswordDto';
export declare class ChancePasswordService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    run({ code, password, email, }: RequestChancePasswordDto): Promise<void>;
    private ensureUserEmailExist;
    private ensureCodeIsValid;
}
