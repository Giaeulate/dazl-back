import { UserRepository } from '../../../users/domain/UserRepository';
export declare class UsersRegisterReportService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    run(gender: string | null): Promise<{
        total: number;
    }>;
    private ensureGenderIsValid;
}
