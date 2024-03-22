import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
import { FinderUser } from '../../../users/application/Finder/FinderUser';
import { GetterLastUserActiveStillService } from '../../../user_activation/application/getter-last-still-active/getter-last-user-active-still.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
type Params = {
    userId: string;
};
export declare class UserBlockedByUserSearcher {
    private readonly finderUser;
    private readonly getterLastUserActiveStillService;
    private readonly fileFinderService;
    private readonly userBlockedActiveSearcher;
    constructor(repository: UserBlockedRepository, finderUser: FinderUser, getterLastUserActiveStillService: GetterLastUserActiveStillService, fileFinderService: FileFinderService);
    run({ userId }: Params): Promise<Array<Response>>;
}
type UserBlocked = {
    id: string;
    gender: string;
    age: number;
    activationImage: string;
    details: string;
    name: string;
};
type Response = {
    id: string;
    userBlocked: UserBlocked;
    createdAt: string;
    updatedAt: string;
};
export {};
