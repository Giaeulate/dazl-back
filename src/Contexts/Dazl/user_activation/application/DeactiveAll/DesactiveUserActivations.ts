import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_BUS,
  USER_ACTIVATION_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserId } from '../../../users/domain/UserId';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { FinderUserActivationByUserActiveService } from '../finder-by-user-and-active/finder-user-activation-by-user-active.service';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';

@Injectable()
export class DesactiveUserActivations {
  private readonly finderUserActivationByUserActiveService: FinderUserActivationByUserActiveService;

  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
    private readonly moduleGateway: ModuleGateway,
  ) {
    this.finderUserActivationByUserActiveService =
      new FinderUserActivationByUserActiveService(userActivationRepository);
  }

  async run(userId: UserId) {
    const userActivation =
      await this.finderUserActivationByUserActiveService.run(userId);
    console.log('DesactiveUserActivations', userActivation);
    if (userActivation) {
      userActivation.deactivate();
      userActivation.userDeleted();
      await this.userActivationRepository.save(userActivation);
      await this.eventBus.publish(userActivation.pullDomainEvents());
      // this.moduleGateway.wss.emit(ChannelName.IAM_ACTIVE, true);
    }
  }
}
