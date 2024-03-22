/// <reference types="multer" />
import { UserId } from '../../../users/domain/UserId';
import { GetterLastUserActiveStillService } from '../getter-last-still-active/getter-last-user-active-still.service';
import { UserRepository } from '../../../users/domain/UserRepository';
import { UploadUserImageService } from '../../../file/application/creator/upload-user-image.service';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationDetails } from '../../domain/UserActivationDetails';
import { GetterUserActivationStatusService } from '../getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { UserActivationMale } from '../../domain/UserActivationMale';
import { UserActivationFemale } from '../../domain/UserActivationFemale';
import { UserActivationLgtb } from '../../domain/UserActivationLgtb';
export declare class UpdaterPhotoUserActivation {
    private readonly getterLastUserActiveStillService;
    private readonly userRepository;
    private readonly imageService;
    private readonly getterUserActivationStatusService;
    private readonly activationFinder;
    private readonly moduleGateway;
    private readonly userActivationRepository;
    constructor(getterLastUserActiveStillService: GetterLastUserActiveStillService, userRepository: UserRepository, imageService: UploadUserImageService, getterUserActivationStatusService: GetterUserActivationStatusService, activationFinder: UserActivationFinder, moduleGateway: ModuleGateway, userActivationRepository: UserActivationRepository);
    run(active_photo: Express.Multer.File, details: UserActivationDetails, male: UserActivationMale, female: UserActivationFemale, lgtb: UserActivationLgtb, userId: UserId): Promise<void>;
    private ensureUserExist;
}
