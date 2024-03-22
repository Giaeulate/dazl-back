import { UserActivationRepository } from '../../../user_activation/domain/UserActivationRepository';
export declare class UsersActivationLatLogService {
    private readonly userActivationRepository;
    constructor(userActivationRepository: UserActivationRepository);
    run({ startDateString, endDateString, }: {
        startDateString: string;
        endDateString: string;
    }): Promise<any>;
    private ensureDateFormatIsValid;
    private ensureDateIsValid;
    private getDates;
}
