import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { RequestChancePasswordDto } from '../../../../Contexts/Dazl/users/application/chance-password/dto/RequestChancePasswordDto';
import { ChancePasswordService } from '../../../../Contexts/Dazl/users/application/chance-password/chance-password-user.service';
export declare class ChancePasswordUserController {
    private readonly chancePasswordService;
    constructor(chancePasswordService: ChancePasswordService);
    run(request: RequestChancePasswordDto): Promise<FormatResponse>;
}
