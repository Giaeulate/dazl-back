import { UserActivationRequestDto } from '../dto/UserActivationRequestDto';
export declare class ValidateUserActivation {
    constructor();
    run(request: UserActivationRequestDto): Promise<void>;
}
