import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { UserActivationRequestDto } from '../../../../Contexts/Dazl/user_activation/application/dto/UserActivationRequestDto';
import { ValidateUserActivation } from '../../../../Contexts/Dazl/user_activation/application/validate/ValidateUserActivation';
import { ForbiddenWordAllSearcher } from '../../../../Contexts/Dazl/forbidden_words/application/search-all/ForbiddenWordAllSearcher';
export declare class HeadersController {
    version_updated: string;
}
export declare class UserActiveValidationPostController {
    private readonly validateUserActivation;
    private readonly forbiddenWordAllSearcher;
    constructor(validateUserActivation: ValidateUserActivation, forbiddenWordAllSearcher: ForbiddenWordAllSearcher);
    run(request: UserActivationRequestDto, headers: HeadersController): Promise<FormatResponse>;
}
