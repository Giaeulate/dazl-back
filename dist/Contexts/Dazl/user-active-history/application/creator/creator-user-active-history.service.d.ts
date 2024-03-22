import { UserActiveHistoryRepository } from '../../domain/UserActiveHistoryRepository';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UserId } from '../../../users/domain/UserId';
export declare class CreatorUserActiveHistoryService {
    private readonly userActiveHistoryRepository;
    private readonly userFinderService;
    constructor(userActiveHistoryRepository: UserActiveHistoryRepository, userFinderService: UserFinderService);
    run({ userId, startTime, endTime, }: {
        userId: UserId;
        startTime: string;
        endTime: string;
    }): Promise<void>;
}
