import { UserActivationRequestDto } from '../dto/UserActivationRequestDto';
import { GetterLastUserActiveStillService } from '../getter-last-still-active/getter-last-user-active-still.service';
import { UserId } from '../../../users/domain/UserId';
import { ActiveUserWsService } from '../active-user/active-user-ws.service';
import { Injectable } from '@nestjs/common';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { UserActivationUpdaterService } from '../updater/user-activation-updater.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { UserLiveAllByUserSearcher } from '../../../user-live/application/search-all-by-user/UserLiveAllByUserSearcher';
import { UserLiveActive } from '../../../user-live/application/active/UserLiveActive';

@Injectable()
export class UserActivationCreatorOrActivatorService {
  constructor(
    private readonly getterLastUserActiveStillService: GetterLastUserActiveStillService,
    private readonly activeUserWsService: ActiveUserWsService,
    private readonly userActivationUpdaterService: UserActivationUpdaterService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly liveAllByUserSearcher: UserLiveAllByUserSearcher,
    private readonly userLiveActive: UserLiveActive,
  ) {}

  async run(
    idUser: string,
    activationRequestDto: UserActivationRequestDto,
    socketId: string,
    token?: string,
  ) {
    const userActivationStill = await this.getterLastUserActiveStillService.run(
      new UserId(idUser),
    );
    if (!userActivationStill) {
      const userActivation = await this.activeUserWsService.registerClient(
        idUser,
        activationRequestDto,
        socketId,
        token,
      );
      const lives = await this.liveAllByUserSearcher.run(
        userActivation.userId.value,
      );
      for (const life of lives) {
        await this.userLiveActive.run({ userId: life.userId.value });
      }
      if (lives) {
        for (const life of lives) {
          await this.userLiveActive.run({ userId: life.userId.value });
        }
      }
      return userActivation;
    }

    await this.userActivationUpdaterService.run(userActivationStill.id, {
      active: IsBoolean.TRUE,
      activeDate: new Date().getTime().toString(),
      details: activationRequestDto.details,
      male:
        activationRequestDto.male === '1' ? IsBoolean.TRUE : IsBoolean.FALSE,
      female:
        activationRequestDto.female === '1' ? IsBoolean.TRUE : IsBoolean.FALSE,
      fileImageId: activationRequestDto.fileId,
      lgtb:
        activationRequestDto.lgtb === '1' ? IsBoolean.TRUE : IsBoolean.FALSE,
      name: activationRequestDto.name,
      latitude: activationRequestDto.latitude,
      longitude: activationRequestDto.longitude,
    });
    return await this.finderUserActivationService.run(userActivationStill.id);
  }
}
