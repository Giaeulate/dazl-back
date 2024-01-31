import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserId } from '../../../users/domain/UserId';
import { GetterLastUserActiveStillService } from '../getter-last-still-active/getter-last-user-active-still.service';
import {
  USER_ACTIVATION_REPOSITORY,
  USER_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../../users/domain/UserRepository';
import { User } from '../../../users/domain/User';
import { UploadUserImageService } from '../../../file/application/creator/upload-user-image.service';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { UserActivationDetails } from '../../domain/UserActivationDetails';
import { UserActivationId } from '../../domain/UserActivationId';
import { GetterUserActivationStatusService } from '../getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { UserActivationMale } from '../../domain/UserActivationMale';
import { UserActivationFemale } from '../../domain/UserActivationFemale';
import { UserActivationLgtb } from '../../domain/UserActivationLgtb';

@Injectable()
export class UpdaterPhotoUserActivation {
  constructor(
    private readonly getterLastUserActiveStillService: GetterLastUserActiveStillService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly imageService: UploadUserImageService,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
    private readonly activationFinder: UserActivationFinder,
    private readonly moduleGateway: ModuleGateway,
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
  ) {}

  async run(
    active_photo: Express.Multer.File,
    details: UserActivationDetails,
    male: UserActivationMale,
    female: UserActivationFemale,
    lgtb: UserActivationLgtb,
    userId: UserId,
  ) {
    const user = await this.userRepository.search(userId);
    this.ensureUserExist(user);
    const userActivation = await this.getterLastUserActiveStillService.run(
      userId,
    );
    if (!userActivation) {
      throw new UnauthorizedException('User Not Active');
    }
    if (active_photo) {
      let file = await this.imageService.run(active_photo, true, true);
      userActivation.fileImageId = file.thumbnail.id;
    }
    const list = await this.getterUserActivationStatusService.run(
      userActivation.id.value,
      {
        lowerAge: userActivation.ageLowerFilter,
        upperAge: userActivation.ageUpperFilter,
        distance: userActivation.distanceFilter,
      },
    );
    console.log('details', details);
    console.log('config', male, female, lgtb);
    if (details) userActivation.changeDetails(details);
    userActivation.updateConfig(male, female, lgtb);
    console.log('userActivation', userActivation);
    await this.userActivationRepository.save(userActivation);

    const list2 = await this.getterUserActivationStatusService.run(
      userActivation.id.value,
      {
        lowerAge: userActivation.ageLowerFilter,
        upperAge: userActivation.ageUpperFilter,
        distance: userActivation.distanceFilter,
      },
    );

    for (const user of list.listOfPossibleMatches) {
      const userActivationOnly = await this.activationFinder.run(
        new UserActivationId(user.id),
      );

      const list = await this.getterUserActivationStatusService.run(
        userActivationOnly.id.value,
        {
          lowerAge: userActivationOnly.ageLowerFilter,
          upperAge: userActivationOnly.ageUpperFilter,
          distance: userActivationOnly.distanceFilter,
        },
      );
      this.moduleGateway.wss
        .to(userActivationOnly.userId.value)
        .emit(ChannelName.IAM_ACTIVE, list);
    }
    for (const user of list2.listOfPossibleMatches) {
      const userActivationOnly = await this.activationFinder.run(
        new UserActivationId(user.id),
      );

      const list = await this.getterUserActivationStatusService.run(
        userActivationOnly.id.value,
        {
          lowerAge: userActivationOnly.ageLowerFilter,
          upperAge: userActivationOnly.ageUpperFilter,
          distance: userActivationOnly.distanceFilter,
        },
      );
      this.moduleGateway.wss
        .to(userActivationOnly.userId.value)
        .emit(ChannelName.IAM_ACTIVE, list);
    }
    this.moduleGateway.wss
      .to(userActivation.userId.value)
      .emit(ChannelName.IAM_ACTIVE, list2);
  }

  private ensureUserExist(user: User) {
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
