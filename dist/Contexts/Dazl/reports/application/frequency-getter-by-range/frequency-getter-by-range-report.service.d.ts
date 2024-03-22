import { UserActivationRepository } from '../../../user_activation/domain/UserActivationRepository';
export declare class FrequencyGetterByRangeReportService {
    private readonly userActivationRepository;
    constructor(userActivationRepository: UserActivationRepository);
    run({ startDateString, endDateString, }: {
        startDateString: string;
        endDateString: string;
    }): Promise<{
        '0-8': number;
        '8-16': number;
        '16-24': number;
        total: number;
    }>;
    private ensureDateFormatIsValid;
    private ensureDateIsValid;
}
