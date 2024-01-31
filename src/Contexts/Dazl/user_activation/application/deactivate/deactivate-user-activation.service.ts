import { Injectable } from '@nestjs/common';
import { UserActivationId } from '../../domain/UserActivationId';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { UserActivationUpdaterService } from '../updater/user-activation-updater.service';
import { GetterUserActivationStatusService } from '../getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';

@Injectable()
export class DeactivateUserActivationService {
  constructor(
    private readonly moduleGateway: ModuleGateway,
    private readonly userActivationUpdaterService: UserActivationUpdaterService, // private readonly sendNotificationService: SendNotificationService, // private readonly finderUserActivationService: UserActivationFinder,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
    private readonly activationFinder: UserActivationFinder,
  ) {}

  async run(id: UserActivationId): Promise<void> {
    const userActivation = await this.activationFinder.run(id);

    const list = await this.getterUserActivationStatusService.run(
      userActivation.id.value,
      {
        lowerAge: userActivation.ageLowerFilter,
        upperAge: userActivation.ageUpperFilter,
        distance: userActivation.distanceFilter,
      },
    );
    await this.userActivationUpdaterService.run(id, {
      active: IsBoolean.FALSE,
    });

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
    this.moduleGateway.wss
      .to(userActivation.userId.value)
      .emit(ChannelName.IAM_ACTIVE, list);
  }
}
