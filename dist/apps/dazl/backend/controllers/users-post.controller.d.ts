import { UserCreatorService } from '../../../../Contexts/Dazl/users/application/user-creator/user-creator.service';
import { UserCreatorRequestDto } from '../../../../Contexts/Dazl/users/application/dto/user-creator-request.dto';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
export declare class UsersPostController {
    private readonly userCreatorService;
    private readonly logger;
    constructor(userCreatorService: UserCreatorService);
    register(request: UserCreatorRequestDto): Promise<FormatResponse>;
}
