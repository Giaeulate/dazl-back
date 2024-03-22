import { UserLoginRequestDto } from '../dto/user-login-request.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthUserRepository } from '../../domain/AuthRepository';
import { UpdaterUserService } from '../../../users/application/updater/updater-user.service';
export declare class AuthUserLoginService {
    private readonly jwtService;
    private readonly authUserRepository;
    private readonly updaterUserService;
    constructor(jwtService: JwtService, authUserRepository: AuthUserRepository, updaterUserService: UpdaterUserService);
    run(request: UserLoginRequestDto): Promise<any>;
    private getJwtToken;
}
