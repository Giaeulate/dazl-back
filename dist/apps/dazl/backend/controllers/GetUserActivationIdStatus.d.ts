import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
declare class ParamsGetUserActivationIdStatus {
    id: string;
}
declare class QueryParamsGetUserActivationIdStatus {
    upper_age: number;
    lower_age: number;
    distance: number;
}
export declare class GetUserActivationIdStatus {
    private readonly getterUserActivationStatusService;
    constructor(getterUserActivationStatusService: GetterUserActivationStatusService);
    run(params: ParamsGetUserActivationIdStatus, queries: QueryParamsGetUserActivationIdStatus): Promise<SuccessfulFormatResponse<import("../../../../Contexts/Dazl/user_activation/domain/dto/UsersActiveDto").UsersActiveDto>>;
}
export {};
