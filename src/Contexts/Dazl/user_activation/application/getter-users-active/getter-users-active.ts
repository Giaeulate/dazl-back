import { Inject, Injectable } from '@nestjs/common';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { GeometricCalculatorService } from '../../../Shared/application/calculator-if-within-radius/geometric-calculator.service';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { UserId } from '../../../users/domain/UserId';
import { UserActivation } from '../../domain/UserActivation';
import { UsersActiveUserDto } from '../../domain/dto/indexDto';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserGenderEnum } from '../../../users/domain/UserGender';
import { UserActivationFemale } from '../../domain/UserActivationFemale';
import { UserActivationMale } from '../../domain/UserActivationMale';
import { UserActivationLgtb } from '../../domain/UserActivationLgtb';

@Injectable()
export class GetterUsersActive {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    private readonly geometricCalculatorService: GeometricCalculatorService,
    private readonly userFinderService: UserFinderService,
    private readonly finderAllInvitationService: FinderAllInvitationService,
  ) {}

  async run(
    userId: UserId,
    genderEnum: UserGenderEnum,
    whatToLookingFor: {
      male: IsBoolean;
      female: IsBoolean;
      lgtb: IsBoolean;
    },
  ): Promise<Array<UsersActiveUserDto>> {
    const userActivationsAllList =
      await this.userActivationRepository.searchAll();
    const userActivationsAll = userActivationsAllList.filter(
      (userActivation) =>
        Number(userActivation.latitude.value) !== 0 &&
        Number(userActivation.longitude.value) !== 0,
    );

    // const userBlockedByUser = await this.userBlockedByUserSearcher.run({
    //   userId: userId.value,
    // });
    //
    // console.log('userBlockedByUser', userBlockedByUser);
    //
    // const userActivations = userActivationsAll.filter((userActivation) => {
    //   return !userBlockedByUser?.find(
    //     (userBlocked) =>
    //       userBlocked.userBlocked.id === userActivation.userId.value,
    //   );
    // });

    // Find a user activation that was active, by user id
    const userActivationIam = userActivationsAll.find(
      (userActivation) =>
        userActivation.userId.equals(userId) &&
        userActivation.isTheLocatorActivated.isActivated() &&
        userActivation.active.isActive(),
    );

    if (!userActivationIam) {
      return [];
    }
    const meters =
      userActivationIam?.distanceFilter.value === 0
        ? 1500
        : userActivationIam?.distanceFilter.value;

    console.log('meters', meters);
    const userAllDistance = userActivationsAll
      .filter((userActivation) =>
        this.geometricCalculatorService.isInsideRadio(
          Number.parseFloat(userActivation.latitude.value),
          Number.parseFloat(userActivation.longitude.value),
          Number.parseFloat(userActivationIam.latitude.value),
          Number.parseFloat(userActivationIam.longitude.value),
          meters,
        ),
      )
      .filter((userActivation) => userActivation.userIsDeleted.isAvailable());
    // console.log('userAllDistance', userAllDistance);

    // Find all user activations that were invited by the user activation that was active
    const allUsersActivated = userAllDistance.filter(
      (userActivation) =>
        !userActivation.id.equals(userActivationIam.id) && // Delete the own user activation
        userActivation.active.isActive() && // Find only the user activations that are active
        userActivation.female.equals(
          new UserActivationFemale(whatToLookingFor.female),
        ) &&
        userActivation.lgtb.equals(
          new UserActivationLgtb(whatToLookingFor.lgtb),
        ) && // Find only the user activations that are looking for lgtb
        userActivation.isTheLocatorActivated.isActivated() && // Find only the user activations that are looking for female
        userActivation.male.equals(
          new UserActivationMale(whatToLookingFor.male),
        ), // Find only the user activations that are looking for male
    );

    // Get all invitations
    const invitations = await this.finderAllInvitationService.run();

    const invitationsWhereIAppear = invitations.filter(
      (invitation) =>
        invitation.userActivationFromId.equals(userActivationIam?.id) ||
        invitation.userActivationToId.equals(userActivationIam?.id),
    );
    const invitationsWhereIAppearUserId = [
      ...invitationsWhereIAppear.flatMap(
        (invitation) => invitation.userActivationToId,
      ),
      ...invitationsWhereIAppear.flatMap(
        (invitation) => invitation.userActivationFromId,
      ),
    ];
    // console.log('userActivationIdWhoIInvited', invitationsWhereIAppearUserId);
    const userActivationIdWhoIInvited = allUsersActivated.filter(
      (userActivation) =>
        !invitationsWhereIAppearUserId.find(
          (userActivationId) =>
            userActivationId.equals(userActivation?.id) &&
            userActivation.isActivated(),
        ),
    );

    const activeUserDtosPromise = userActivationIdWhoIInvited.map(
      async (userActivation) => await this.setUser(userActivation),
    );

    const activeUserDtos = await Promise.all(activeUserDtosPromise);

    // console.log('activeUserDtos', activeUserDtos);
    // console.log('usersActiveUserDtos', usersActiveUserDtos);
    return activeUserDtos
      .filter((usersActiveUserDto) => {
        if (
          userActivationIam.ageUpperFilter.value !== 0 &&
          userActivationIam.ageLowerFilter.value !== 0
        ) {
          return (
            usersActiveUserDto.user.age >=
              userActivationIam.ageLowerFilter.value &&
            usersActiveUserDto.user.age <=
              userActivationIam.ageUpperFilter.value
          );
        } else {
          return true;
        }
      })
      .filter((usersActiveUserDto) => {
        console.log('genderEnum', genderEnum);
        if (!genderEnum) {
          return true;
        } else {
          return usersActiveUserDto.user.gender == genderEnum;
        }
      });
  }

  private async setUser(userActivation: UserActivation) {
    const user = await this.userFinderService.invoke(userActivation.userId);
    return new UsersActiveUserDto(
      userActivation.toPrimitives().convertToDto(),
      user,
    );
  }
}
