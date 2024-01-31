import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { GetterLastUserActiveStillService } from '../../../../Contexts/Dazl/user_activation/application/getter-last-still-active/getter-last-user-active-still.service';
import { UserId } from '../../../../Contexts/Dazl/users/domain/UserId';
import { USER_REPOSITORY } from '../../../../Contexts/Shared/domain/constants/constants';
import { UserRepository } from '../../../../Contexts/Dazl/users/domain/UserRepository';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { UserActivationCreatorOrActivatorService } from '../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';
import { ChannelName } from '../gateways/constants';
import { ModuleGateway } from '../gateways/module.gateway';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { EventsActiveByLatLogGetter } from 'src/Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter';

@Controller('v1/user')
// @UseGuards(AuthGuard('jwt'))
export class GetByPassController {
  constructor(
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
    private readonly getterLastUserActiveStillService: GetterLastUserActiveStillService,
    private readonly moduleGateway: ModuleGateway,
    private readonly activationFinder: UserActivationFinder,
    private readonly userActivationCreatorOrActivatorService: UserActivationCreatorOrActivatorService,
    private readonly eventsActiveByLatLogGetter: EventsActiveByLatLogGetter,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  @Get(':id/getByPass')
  @HttpCode(HttpStatus.OK)
  async run(@Param('id') id: string): Promise<{}> {
    console.log('GetByPassController');
    const user = await this.userRepository.search(new UserId(id));
    const userActivationNow = await this.getterLastUserActiveStillService.run(
      new UserId(id),
    );
    console.log('userActivationNow', userActivationNow);
    if (!userActivationNow) {
      throw new UnauthorizedException({
        status: false,
        message: 'El tiempo de activación caducó. Debes volver a activarte',
      });
    }
    const userActivation =
      await this.userActivationCreatorOrActivatorService.run(
        user.id.value,
        {
          details: userActivationNow.details.value,
          fileId: userActivationNow.fileImageId.value,
          latitude: userActivationNow.latitude.value,
          male: userActivationNow.male.value === 1 ? '1' : '0',
          female: userActivationNow.female.value === 1 ? '1' : '0',
          longitude: userActivationNow.longitude.value,
          name: userActivationNow.name.value,
          lgtb: userActivationNow.lgtb.value === 1 ? '1' : '0',
          tokenFirebase: user.tokenFirebase.value,
        },
        userActivationNow.socketId.value,
        userActivationNow.token.value,
      );

    console.log('userActivation', userActivation);

    const list = await this.getterUserActivationStatusService.run(
      userActivation.id.value,
      {
        lowerAge: userActivation.ageLowerFilter,
        upperAge: userActivation.ageUpperFilter,
        distance: userActivation.distanceFilter,
      },
    );
    for (const user of list.listOfPossibleMatches) {
      const userActivationOnly = await this.activationFinder.run(
        new UserActivationId(user.id),
      );

      const list = await this.getterUserActivationStatusService.run(
        userActivationOnly.id.value,
        {
          lowerAge: userActivationOnly.ageLowerFilter,
          upperAge: userActivationOnly.ageUpperFilter,
          distance: userActivationOnly.distanceFilter,
        },
      );
      
      this.moduleGateway.wss
        .to(userActivationOnly.userId.value)
        .emit(ChannelName.IAM_ACTIVE, list);
    }

    const eventsData = await this.eventsActiveByLatLogGetter.run({
      lat: userActivationNow.latitude,
      log: userActivationNow.longitude,
      distance: userActivation.distanceFilter.value,
    });

    console.log('User Active')



    return {
      status: true,
      message: 'User Active value',
      item: {
        details: userActivation.details.value,
        male: userActivation.male.value === 1,
        female: userActivation.female.value === 1,
        longitude: userActivation.longitude.value,
        latitude: userActivation.latitude.value,
        name: userActivation.name.value,
        fileId: userActivation.fileImageId.value,
        firebaseCloudMessagingToken: user.tokenFirebase.value,
        token: userActivation.token.value,
      },
      events: eventsData,
      items: list,
    };
  }
}
