import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserActivationUpdateLocatorDomainEvent } from '../../domain/UserActivationUpdateLocatorDomainEvent';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationId } from '../../domain/UserActivationId';
import { GetterUserActivationStatusService } from '../getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';

@Injectable()
export class SendUserListOnUserActivationLocatorChanged {
  constructor(
    private readonly moduleGateway: ModuleGateway,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
    private readonly activationFinder: UserActivationFinder,
  ) {}

  @OnEvent(UserActivationUpdateLocatorDomainEvent.name)
  async on(event: UserActivationUpdateLocatorDomainEvent) {
    const { id } = event;

    //TODO: Implementar
    const userActivation = await this.activationFinder.run(
      new UserActivationId(id),
    );

    const list = await this.getterUserActivationStatusService.run(
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
    this.moduleGateway.wss
      .to(userActivation.userId.value)
      .emit(ChannelName.IAM_ACTIVE, list);
  }
}
