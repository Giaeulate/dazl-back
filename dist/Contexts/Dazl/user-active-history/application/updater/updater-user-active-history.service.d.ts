import { FinderUserActiveHistoryService } from '../finder/finder-user-active-history.service';
import { UserActiveHistoryId } from '../../domain/UserActiveHistoryId';
import { UserId } from '../../../users/domain/UserId';
import { UserActiveHistoryRepository } from '../../domain/UserActiveHistoryRepository';
export declare class UpdaterUserActiveHistoryService {
    private readonly userActiveHistoryRepository;
    private readonly finderUserActiveHistoryService;
    constructor(userActiveHistoryRepository: UserActiveHistoryRepository, finderUserActiveHistoryService: FinderUserActiveHistoryService);
    run(id: UserActiveHistoryId, plainData: {
        userId?: UserId;
        startTime?: string;
        endTime?: string;
        status?: string;
    }): Promise<void>;
}
