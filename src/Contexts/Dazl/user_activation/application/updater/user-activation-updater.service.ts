import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_BUS,
  USER_ACTIVATION_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserId } from '../../../users/domain/UserId';
import { FileId } from '../../../file/domain/FileId';
import { UserActivationDetails } from '../../domain/UserActivationDetails';
import { UserActivationTimeAdded } from '../../domain/UserActivationTimeAdded';
import { UserActivationName } from '../../domain/UserActivationName';
import { UserActivationMale } from '../../domain/UserActivationMale';
import { UserActivationFemale } from '../../domain/UserActivationFemale';
import { UserActivationActiveDate } from '../../domain/UserActivationActiveDate';
import { UserActivationCurrentLives } from '../../domain/UserActivationCurrentLives';
import { UserActivationLongitude } from '../../domain/UserActivationLongitude';
import { UserActivationLatitude } from '../../domain/UserActivationLatitude';
import { UserActivationIsActiveSocket } from '../../domain/UserActivationIsActiveSocket';
import { UserActivationSocketId } from '../../domain/UserActivationSocketId';
import { UpdatedAt } from '../../../../Shared/domain/UpdatedAt';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { ForbiddenWordAllSearcher } from '../../../forbidden_words/application/search-all/ForbiddenWordAllSearcher';

@Injectable()
export class UserActivationUpdaterService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly forbiddenWordAllSearcher: ForbiddenWordAllSearcher,
  ) {}

  run = async (
    id: UserActivationId,
    plainData: {
      userId?: string;
      fileImageId?: string;
      details?: string;
      timeAdded?: string;
      active?: number;
      name?: string;
      male?: number;
      lgtb?: number;
      female?: number;
      activeDate?: string;
      currentLives?: number;
      longitude?: string;
      latitude?: string;
      isActiveSocket?: number;
      socketId?: string;
    },
  ): Promise<void> => {
    const userActivation = await this.finderUserActivationService.run(id);
    const words = await this.forbiddenWordAllSearcher.search();

    userActivation.userId = plainData.userId
      ? new UserId(plainData.userId)
      : userActivation.userId;
    userActivation.fileImageId = plainData.fileImageId
      ? new FileId(plainData.fileImageId)
      : userActivation.fileImageId;
    userActivation.details = plainData.details
      ? UserActivationDetails.checkForbiddenTerms(
          words.map((word) => word.text.value.toString()),
          plainData.details,
        )
      : userActivation.details;
    userActivation.timeAdded = plainData.timeAdded
      ? new UserActivationTimeAdded(plainData.timeAdded)
      : userActivation.timeAdded;

    if (plainData.active != undefined) {
      if (plainData.active == 0) {
        userActivation.deactivate();
      } else if (plainData.active == 1) {
        userActivation.activeSession();
      }
    }

    userActivation.name = plainData.name
      ? new UserActivationName(plainData.name)
      : userActivation.name;
    userActivation.male =
      plainData.male != undefined
        ? new UserActivationMale(plainData.male)
        : userActivation.male;
    userActivation.female =
      plainData.female != undefined
        ? new UserActivationFemale(plainData.female)
        : userActivation.female;
    userActivation.lgtb =
      plainData.lgtb != undefined
        ? new UserActivationMale(plainData.lgtb)
        : userActivation.lgtb;

    userActivation.activeDate = plainData.activeDate
      ? new UserActivationActiveDate(plainData.activeDate)
      : userActivation.activeDate;
    userActivation.currentLives = plainData.currentLives
      ? new UserActivationCurrentLives(plainData.currentLives)
      : userActivation.currentLives;
    userActivation.longitude = plainData.longitude
      ? new UserActivationLongitude(plainData.longitude)
      : userActivation.longitude;
    userActivation.latitude = plainData.latitude
      ? new UserActivationLatitude(plainData.latitude)
      : userActivation.latitude;
    userActivation.isActiveSocket =
      plainData.isActiveSocket != undefined
        ? new UserActivationIsActiveSocket(plainData.isActiveSocket)
        : userActivation.isActiveSocket;
    userActivation.socketId = plainData.socketId
      ? new UserActivationSocketId(plainData.socketId)
      : userActivation.socketId;

    userActivation.updatedAt = new UpdatedAt(new Date().toISOString());

    await this.userActivationRepository.save(userActivation);
    await this.eventBus.publish(userActivation.pullDomainEvents());
  };
}
