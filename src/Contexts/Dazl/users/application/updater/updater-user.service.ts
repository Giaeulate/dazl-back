import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserId } from '../../domain/UserId';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UserFirstName } from '../../domain/UserFirstName';
import { UserLastName } from '../../domain/UserLastName';
import { UserGender } from '../../domain/UserGender';
import { UserAge } from '../../domain/UserAge';
import { UserName } from '../../domain/UserName';
import {
  EVENT_BUS,
  USER_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../domain/UserRepository';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';
import { UserPopularity } from '../../domain/UserPopularity';
import { UserConfirmationCode } from '../../domain/UserConfirmationCode';
import { UserConfirmationTime } from '../../domain/UserConfirmationTime';
import { UserStatus } from '../../domain/UserStatus';
import { UserLatitude } from '../../domain/UserLatitude';
import { UserLongitude } from '../../domain/UserLongitude';
import { UserTokenFirebase } from '../../domain/UserTokenFirebase';
import { UserActiveDate } from '../../domain/UserActiveDate';
import { UserExpirationDate } from '../../domain/UserExpirationDate';
import { UpdatedAt } from '../../../../Shared/domain/UpdatedAt';
import { UserActive } from '../../domain/UserActive';
import { UserFacebookUrl } from '../../domain/UserFacebookUrl';
import { UserInstagramUrl } from '../../domain/UserInstagramUrl';
import { UserWhatsappUrl } from '../../domain/UserWhatsappUrl';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';

@Injectable()
export class UpdaterUserService {
  constructor(
    private readonly userFinderService: UserFinderService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  run = async (
    id: UserId,
    plainData: {
      name?: string;
      firstName?: string;
      lastName?: string;
      gender?: string;
      age?: number;
      email?: string;
      password?: string;
      popularity?: number;
      confirmationCode?: string;
      confirmationTime?: string;
      status?: string;
      latitude?: string;
      longitude?: string;
      tokenFirebase?: string;
      active?: boolean;
      activeDate?: string;
      expirationDate?: string;
      otherEmail?: string;
      instagramUrl?: string;
      whatsappUrl?: string;
    },
  ): Promise<void> => {
    const user = await this.userFinderService.invoke(id);
    if (!user) throw new NotFoundException('User not found' + id.value);

    user.firstName = plainData.firstName
      ? new UserFirstName(plainData.firstName)
      : user.firstName;
    user.lastName = plainData.lastName
      ? new UserLastName(plainData.lastName)
      : user.lastName;
    user.gender = plainData.gender
      ? new UserGender(plainData.gender)
      : user.gender;
    user.age = plainData.age ? new UserAge(plainData.age) : user.age;
    user.name = plainData.name ? new UserName(plainData.name) : user.name;
    user.email = plainData.email ? new UserEmail(plainData.email) : user.email;
    user.password = plainData.password
      ? new UserPassword(plainData.password)
      : user.password;
    user.popularity = plainData.popularity
      ? new UserPopularity(plainData.popularity)
      : user.popularity;
    user.confirmationCode = plainData.confirmationCode
      ? new UserConfirmationCode(plainData.confirmationCode)
      : user.confirmationCode;
    user.confirmationTime = plainData.confirmationTime
      ? new UserConfirmationTime(plainData.confirmationTime)
      : user.confirmationTime;
    user.status = plainData.status
      ? new UserStatus(plainData.status)
      : user.status;
    user.latitude = plainData.latitude
      ? new UserLatitude(plainData.latitude)
      : user.latitude;
    user.longitude = plainData.longitude
      ? new UserLongitude(plainData.longitude)
      : user.longitude;
    user.tokenFirebase = plainData.tokenFirebase
      ? new UserTokenFirebase(plainData.tokenFirebase)
      : user.tokenFirebase;
    user.activeDate = plainData.activeDate
      ? new UserActiveDate(plainData.activeDate)
      : user.activeDate;
    user.expirationDate = plainData.expirationDate
      ? new UserExpirationDate(plainData.expirationDate)
      : user.expirationDate;

    if (plainData.active !== undefined) {
      if (plainData.active) {
        user.active = UserActive.active();
      } else {
        user.desactive();
      }
    }

    user.otherEmail =
      plainData.otherEmail !== undefined
        ? new UserFacebookUrl(plainData.otherEmail)
        : user.otherEmail;

    user.instagramUrl =
      plainData.instagramUrl !== undefined
        ? new UserInstagramUrl(plainData.instagramUrl)
        : user.instagramUrl;

    user.whatsappUrl =
      plainData.whatsappUrl !== undefined
        ? new UserWhatsappUrl(plainData.whatsappUrl)
        : user.whatsappUrl;

    user.updatedAt = new UpdatedAt(new Date().toISOString());

    await this.userRepository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
  };
}
