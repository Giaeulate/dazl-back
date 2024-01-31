import { Inject, Injectable } from '@nestjs/common';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationIsTheLocatorActivated } from '../../domain/UserActivationIsTheLocatorActivated';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import {
  EVENT_BUS,
  USER_ACTIVATION_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';

type Params = {
  id: UserActivationId;
  locator: UserActivationIsTheLocatorActivated;
};

@Injectable()
export class LocatorUpdater {
  private readonly activationFinder: UserActivationFinder;
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly repository: UserActivationRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {
    this.activationFinder = new UserActivationFinder(repository);
  }

  async run(params: Params): Promise<void> {
    const { id, locator } = params;
    const userActivation = await this.activationFinder.run(id);
    console.log('LocatorUpdater', userActivation.toPrimitives());
    userActivation.updateLocator(locator);
    console.log(userActivation.toPrimitives());
    await this.repository.save(userActivation);
    await this.eventBus.publish(userActivation.pullDomainEvents());
  }
}
