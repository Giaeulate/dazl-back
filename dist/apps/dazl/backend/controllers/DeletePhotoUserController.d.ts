import { DeleteUserPhoto } from '../../../../Contexts/Dazl/user-photos/application/DeletePhoto/DeleteUserPhoto';
import { FinderUserProfile } from '../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile';
import { JwtService } from '@nestjs/jwt';
export declare class Params {
    id: string;
}
export declare class DeletePhotoUserController {
    private readonly deleteUserPhoto;
    private readonly finderUser;
    private readonly jwtService;
    constructor(deleteUserPhoto: DeleteUserPhoto, finderUser: FinderUserProfile, jwtService: JwtService);
    run(params: Params, payload: any): Promise<{
        status: boolean;
        message: string;
        item: any;
    }>;
}
