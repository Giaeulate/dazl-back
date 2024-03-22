import { UserActiveHistoryRepository } from '../../domain/UserActiveHistoryRepository';
import { UserRepository } from '../../../users/domain/UserRepository';
export declare class GetAverageUserActiveService {
    private readonly userActiveHistoryRepository;
    private readonly userRepository;
    constructor(userActiveHistoryRepository: UserActiveHistoryRepository, userRepository: UserRepository);
    run(): Promise<number>;
    private calculateAverage;
}
