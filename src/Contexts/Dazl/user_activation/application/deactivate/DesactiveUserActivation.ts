import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_BUS,
  USER_ACTIVATION_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserActivation } from '../../domain/UserActivation';

type Params = {
  userActivation: UserActivation;
};

@Injectable()
export class DesactiveUserActivation {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  async run({ userActivation }: Params) {
    userActivation.deactivate();
    await this.userActivationRepository.save(userActivation);
    await this.eventBus.publish(userActivation.pullDomainEvents());
  }
}
