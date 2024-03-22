import { GetterByGenderUserActivationService } from '../../../user_activation/application/getter-by-gender/getter-by-gender-user-activation.service';
export declare class UsersActiveReportService {
    private readonly getterByGenderUserActivationService;
    constructor(getterByGenderUserActivationService: GetterByGenderUserActivationService);
    run(gender: string | null): Promise<{
        total: number;
    }>;
    private ensureGenderIsValid;
}
