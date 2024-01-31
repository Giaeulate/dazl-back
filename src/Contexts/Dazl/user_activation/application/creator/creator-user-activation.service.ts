import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserActivationRequestDto } from '../dto/UserActivationRequestDto';
import {
  EVENT_BUS,
  USER_ACTIVATION_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserId } from '../../../users/domain/UserId';
import { UserActivation } from '../../domain/UserActivation';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { FileId } from '../../../file/domain/FileId';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { CityByLatLogGetter } from '../../../City/application/GetByLatLog/CityByLatLogGetter';
import { CityLatitude } from '../../../City/domain/CityLatitude';
import { CityLongitude } from '../../../City/domain/CityLongitude';
import { ForbiddenWordAllSearcher } from '../../../forbidden_words/application/search-all/ForbiddenWordAllSearcher';
import { UserActivationDetails } from '../../domain/UserActivationDetails';

@Injectable()
export class CreatorUserActivationService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
    private readonly userFinderService: UserFinderService,
    private readonly fileFinderService: FileFinderService,
    private readonly cityByLatLogGetter: CityByLatLogGetter,
    private readonly forbiddenWordAllSearcher: ForbiddenWordAllSearcher,
  ) {}

  async run(
    request: UserActivationRequestDto,
    userId: string,
    socketId: string,
    token: string,
  ) {
    const user = await this.userFinderService.invoke(new UserId(userId));
    if (!user) throw new NotFoundException('User not found');
    const file = await this.fileFinderService.invoke(
      new FileId(request.fileId),
    );

    const words = await this.forbiddenWordAllSearcher.search();

    const details = request.details
      ? UserActivationDetails.checkForbiddenTerms(
          words.map((word) => word.text.value.toString()),
          request.details,
        ).value
      : '';

    const city = await this.cityByLatLogGetter.run({
      lat: new CityLatitude(request.latitude),
      log: new CityLongitude(request.longitude),
    });

    const userActivation = UserActivation.create({
      id: Uuid.random().toString(),
      cityId: city.id.value,
      userId: user.id.value,
      fileImageId: file.id.value,
      details: details,
      name: request.name,
      male: request.male === '1',
      lgtb: request.lgtb === '1',
      female: request.female === '1',
      longitude: request.longitude,
      latitude: request.latitude,
      socketId: socketId,
      token: token,
    });
    await this.userActivationRepository.save(userActivation);
    await this.eventBus.publish(userActivation.pullDomainEvents());
    return userActivation;
  }
}
