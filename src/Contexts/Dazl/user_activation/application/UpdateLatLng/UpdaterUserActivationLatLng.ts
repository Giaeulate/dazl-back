import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_BUS,
  USER_ACTIVATION_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserActivationLatitude } from '../../domain/UserActivationLatitude';
import { UserActivationLongitude } from '../../domain/UserActivationLongitude';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationFinder } from '../finder/UserActivationFinder';

type Params = {
  lat: UserActivationLatitude;
  lng: UserActivationLongitude;
};

@Injectable()
export class UpdaterUserActivationLatLng {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
    private readonly finderUserActivationService: UserActivationFinder,
  ) {}

  async run(id: UserActivationId, params: Params) {
    const userActivation = await this.finderUserActivationService.run(id);
    userActivation.updateLatLng({
      latitude: params.lat,
      longitude: params.lng,
    });
    await this.userActivationRepository.save(userActivation);
    await this.eventBus.publish(userActivation.pullDomainEvents());
    return userActivation;
  }
}
