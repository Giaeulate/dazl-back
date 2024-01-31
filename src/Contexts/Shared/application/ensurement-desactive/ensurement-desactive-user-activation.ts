import { Inject, Injectable } from '@nestjs/common';
import { UserActivationRepository } from '../../../Dazl/user_activation/domain/UserActivationRepository';
import {
  EVENT_BUS,
  USER_ACTIVATION_REPOSITORY,
} from '../../domain/constants/constants';
import { UserActivationActive } from '../../../Dazl/user_activation/domain/UserActivationActive';
import { IsBoolean } from '../../../Dazl/Shared/IsBoolean';
import { EventBus } from '../../domain/bus/event/EventBus';

@Injectable()
export class EnsurementDesactiveUserActivation {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  public async run(): Promise<void> {
    const userActivations = await this.userActivationRepository.searchAll();
    const userActivationsActive = userActivations.filter(({ active }) =>
      active.isActive(),
    );
    for (const userActivation of userActivationsActive) {
      const { expirationDate } = userActivation;
      const dateExpiration = new Date(Number(expirationDate.value)).getTime();
      const now = new Date().getTime();
      if (dateExpiration < now) {
        userActivation.deactivate();
        await this.userActivationRepository.save(userActivation);
        await this.eventBus.publish(userActivation.pullDomainEvents());
      }
    }
  }
}
