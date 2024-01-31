import { Inject, Injectable } from '@nestjs/common';
import { UsersActiveDto } from '../../domain/dto/UsersActiveDto';
import { GetterInvitationReceivedService } from '../getter-receired/getter-invitation-received.service';
import { UserActivationId } from '../../domain/UserActivationId';
import { GetterInvitationSentService } from '../getter-sent/getter-invitation-sent.service';
import { GetterInvitationStatusService } from '../getter-status/getter-invitation-status.service';
import { FinderActiveUsersWsService } from '../fider-active-users/finder-active-users-ws.service';
import { InvitationStatusEnum } from '../../../invitation/domain/InvitationStatus';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationAgeUpperFilter } from '../../domain/UserActivationAgeUpperFilter';
import { UserActivationAgeLowerFilter } from '../../domain/UserActivationAgeLowerFilter';
import { UserActivationDistanceFilter } from '../../domain/UserActivationDistanceFilter';
import { UserLiveAllByUserSearcher } from '../../../user-live/application/search-all-by-user/UserLiveAllByUserSearcher';
import { GetterRemainingLivesService } from '../getter-remaining-lives/getter-remaining-lives.service';

type Params = {
  upperAge?: UserActivationAgeUpperFilter;
  lowerAge?: UserActivationAgeLowerFilter;
  distance?: UserActivationDistanceFilter;
};

@Injectable()
export class GetterUserActivationStatusService {
  constructor(
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly getterInvitationReceivedService: GetterInvitationReceivedService,
    private readonly getterInvitationSentService: GetterInvitationSentService,
    private readonly getterInvitationAcceptedService: GetterInvitationStatusService,
    private readonly finderActiveUsersWsService: FinderActiveUsersWsService,
    private readonly livesService: GetterRemainingLivesService,
    private readonly byUserSearcher: UserLiveAllByUserSearcher,
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
  ) {}

  async run(userActivationId: string, params: Params): Promise<UsersActiveDto> {
    const userActivation = await this.finderUserActivationService.run(
      new UserActivationId(userActivationId),
    );

    userActivation.ageLowerFilter = params.lowerAge
      ? params.lowerAge
      : userActivation.ageLowerFilter;
    userActivation.ageUpperFilter = params.upperAge
      ? params.upperAge
      : userActivation.ageUpperFilter;
    userActivation.distanceFilter = params.distance
      ? params.distance
      : userActivation.distanceFilter;

    await this.userActivationRepository.save(userActivation);

    const userActive = new UsersActiveDto(userActivationId);
    userActive.invitationsReceived =
      await this.getterInvitationReceivedService.run(userActivation.id);
    userActive.invitationsSent = await this.getterInvitationSentService.run(
      userActivation.id,
    );
    userActive.invitationsAccepted =
      await this.getterInvitationAcceptedService.run(
        userActivation.id,
        InvitationStatusEnum.ACCEPTED,
      );
    userActive.listOfPossibleMatches =
      userActivation.isTheLocatorActivated.isActivated() &&
      userActivation.userIsDeleted.isAvailable()
        ? await this.finderActiveUsersWsService.run(userActivation)
        : [];

    console.log('livesService', await this.livesService.run(userActivation.id));
    const lives = await this.byUserSearcher.run(userActivation.userId.value);
    userActive.remainingLives = lives
      .map((live) => live.toPrimitives())
      .map((live) => ({
        status: live.status,
        expirationDate: live.expirationDate,
        activeDate: live.activeDate,
        serverDate: new Date().toISOString(),
      }))
      .sort((a, b) => {
        // sort by status: active, inactive, holding
        if (a.status === 'active') {
          return -1;
        }
        if (b.status === 'active') {
          return 1;
        }
        if (a.status === 'holding') {
          return -1;
        }
        if (b.status === 'holding') {
          return 1;
        }
        return 0;
      })
      .sort((a, b) => {
        // sort by expiration date only if status is holding
        if (a.status === 'holding' && b.status === 'holding') {
          const aDate = new Date(a.expirationDate);
          const bDate = new Date(b.expirationDate);
          if (aDate < bDate) {
            return -1;
          }
        }
      });
    return userActive;
  }
}
