/// <reference types="multer" />
import { UserActivationRequestDto } from '../../../../Contexts/Dazl/user_activation/application/dto/UserActivationRequestDto';
import { UploadUserImageService } from '../../../../Contexts/Dazl/file/application/creator/upload-user-image.service';
import { UserActivationCreatorOrActivatorService } from '../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service';
import { UserLiveAllByUserSearcher } from '../../../../Contexts/Dazl/user-live/application/search-all-by-user/UserLiveAllByUserSearcher';
import { UserLiveByUserCreator } from '../../../../Contexts/Dazl/user-live/application/create-by-user/UserLiveByUserCreator';
import { UpdaterUserService } from '../../../../Contexts/Dazl/users/application/updater/updater-user.service';
import { ModuleGateway } from '../gateways/module.gateway';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { JwtService } from '@nestjs/jwt';
export declare class PostActivationController {
    private readonly uploadUserImageService;
    private readonly userActivationCreatorOrActivatorService;
    private readonly liveAllByUserSearcher;
    private readonly liveByUserCreator;
    private readonly updaterUserService;
    private readonly moduleGateway;
    private readonly activationFinder;
    private readonly getterUserActivationStatusService;
    private readonly jwtService;
    constructor(uploadUserImageService: UploadUserImageService, userActivationCreatorOrActivatorService: UserActivationCreatorOrActivatorService, liveAllByUserSearcher: UserLiveAllByUserSearcher, liveByUserCreator: UserLiveByUserCreator, updaterUserService: UpdaterUserService, moduleGateway: ModuleGateway, activationFinder: UserActivationFinder, getterUserActivationStatusService: GetterUserActivationStatusService, jwtService: JwtService);
    run(file: Express.Multer.File, activationRequestDto: UserActivationRequestDto, payload: any): Promise<import("../../../../Contexts/Dazl/user_activation/domain/dto/UsersActiveDto").UsersActiveDto>;
}
