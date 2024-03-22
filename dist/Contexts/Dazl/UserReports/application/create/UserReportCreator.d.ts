import { UserId } from '../../../users/domain/UserId';
import { UserReportReason } from '../../domain/UserReportReason';
import { FinderUser } from '../../../users/application/Finder/FinderUser';
import { UserReportRepository } from '../../domain/UserReportRepository';
type Params = {
    userWhoReportedId: UserId;
    userWhoWasReportedId: UserId;
    reason: UserReportReason;
};
export declare class UserReportCreator {
    private readonly finderUser;
    private readonly repository;
    constructor(finderUser: FinderUser, repository: UserReportRepository);
    run(params: Params): Promise<void>;
    private ensureUserCanNotReportAgain;
    private ensureUserExist;
}
export {};
