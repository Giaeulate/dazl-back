import { UserLoginRequestDto } from '../../../../Contexts/Dazl/auth/application/dto/user-login-request.dto';
import { AuthUserLoginService } from '../../../../Contexts/Dazl/auth/application/UserLogin/auth-user-login.service';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
export declare class AuthUserLoginController {
    private readonly authUserLoginService;
    private readonly logger;
    constructor(authUserLoginService: AuthUserLoginService);
    run(request: UserLoginRequestDto): Promise<FormatResponse>;
    runActivation(request: UserLoginRequestDto): Promise<FormatResponse>;
}
