import { UserActiveHistory } from '../../domain/UserActiveHistory';
import { UserActiveHistoryRepository } from '../../domain/UserActiveHistoryRepository';
import { UserActiveHistoryId } from '../../domain/UserActiveHistoryId';
export declare class FinderUserActiveHistoryService {
    private readonly userActiveHistoryRepository;
    constructor(userActiveHistoryRepository: UserActiveHistoryRepository);
    run(id: UserActiveHistoryId): Promise<UserActiveHistory>;
    private ensureUserActiveHistoryExists;
}
