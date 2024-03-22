import { UserReportCreator } from '../../../../Contexts/Dazl/UserReports/application/create/UserReportCreator';
declare class BodyPutUsersReportController {
    reason: string;
    user_who_reported: string;
}
declare class ParamsPutUsersReportController {
    id: string;
}
export declare class PutUsersReportController {
    private readonly userReportCreator;
    constructor(userReportCreator: UserReportCreator);
    run(body: BodyPutUsersReportController, params: ParamsPutUsersReportController): Promise<{
        status: boolean;
        message: string;
    }>;
}
export {};
