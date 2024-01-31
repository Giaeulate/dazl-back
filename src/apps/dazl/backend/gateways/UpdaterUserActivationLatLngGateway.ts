import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChannelName } from './constants';
import { UserVerifierService } from '../../../../Contexts/Shared/application/user-verifier.service';
import { UpdaterUserActivationLatLng } from '../../../../Contexts/Dazl/user_activation/application/UpdateLatLng/UpdaterUserActivationLatLng';
import { GetterLastUserActiveStillService } from '../../../../Contexts/Dazl/user_activation/application/getter-last-still-active/getter-last-user-active-still.service';
import { UserId } from '../../../../Contexts/Dazl/users/domain/UserId';
import { UserActivationLatitude } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationLatitude';
import { UserActivationLongitude } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationLongitude';
import { CustomSocket } from './user-activation-ws.gateway';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';

type Payload = {
  lat: string | null;
  lng: string | null;
};

@WebSocketGateway({
  cors: { origin: '*' },
})
export class UpdaterUserActivationLatLngGateway {
  @WebSocketServer() wss: Server;

  constructor(
    private readonly userVerifierService: UserVerifierService,
    private readonly updaterUserActivationLatLng: UpdaterUserActivationLatLng,
    private readonly getterLastUserActiveStillService: GetterLastUserActiveStillService,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
    private readonly activationFinder: UserActivationFinder,
  ) {}

  @SubscribeMessage(ChannelName.CHANGE_POSITION)
  async activeUser(client: CustomSocket, payload: Payload): Promise<void> {
    try {
      const user = this.userVerifierService.verifyUser(client);
      if (!user) {
        client.disconnect();
        return;
      }
      const lastUserActiveStill =
        await this.getterLastUserActiveStillService.run(new UserId(user?.id));
      console.log(
        'UpdaterUserActivationLatLngGateway',
        payload,
        lastUserActiveStill,
      );
      if (!lastUserActiveStill) {
        return;
      }
      const list2 = await this.getterUserActivationStatusService.run(
        lastUserActiveStill.id.value,
        {
          lowerAge: lastUserActiveStill.ageLowerFilter,
          upperAge: lastUserActiveStill.ageUpperFilter,
          distance: lastUserActiveStill.distanceFilter,
        },
      );

      const { lng, lat } = payload;
      await this.updaterUserActivationLatLng.run(lastUserActiveStill.id, {
        lat: lat
          ? new UserActivationLatitude(lat)
          : lastUserActiveStill.latitude,
        lng: lng
          ? new UserActivationLongitude(lng)
          : lastUserActiveStill.longitude,
      });

      const list = await this.getterUserActivationStatusService.run(
        lastUserActiveStill.id.value,
        {
          lowerAge: lastUserActiveStill.ageLowerFilter,
          upperAge: lastUserActiveStill.ageUpperFilter,
          distance: lastUserActiveStill.distanceFilter,
        },
      );

      let idsSet = new Set<string>();
      list.listOfPossibleMatches.forEach((user) => {
        idsSet.add(user.id);
      });
      list2.listOfPossibleMatches.forEach((user) => {
        idsSet.add(user.id);
      });

      for (let id of idsSet) {
        const userActivationOnly = await this.activationFinder.run(
          new UserActivationId(id),
        );

        const list = await this.getterUserActivationStatusService.run(
          userActivationOnly.id.value,
          {
            lowerAge: userActivationOnly.ageLowerFilter,
            upperAge: userActivationOnly.ageUpperFilter,
            distance: userActivationOnly.distanceFilter,
          },
        );
        this.wss
          .to(userActivationOnly.userId.value)
          .emit(ChannelName.IAM_ACTIVE, list);
      }

      // console.log('UpdaterUserActivationLatLngGateway', list);
      // for (const user of list.listOfPossibleMatches) {
      //   const userActivationOnly = await this.activationFinder.run(
      //     new UserActivationId(user.id),
      //   );
      //
      //   const list = await this.getterUserActivationStatusService.run(
      //     userActivationOnly.id.value,
      //     {
      //       lowerAge: userActivationOnly.ageLowerFilter,
      //       upperAge: userActivationOnly.ageUpperFilter,
      //       distance: userActivationOnly.distanceFilter,
      //     },
      //   );
      //   this.wss
      //     .to(userActivationOnly.userId.value)
      //     .emit(ChannelName.IAM_ACTIVE, list);
      // }
      // for (const user of list2.listOfPossibleMatches) {
      //   const userActivationOnly = await this.activationFinder.run(
      //     new UserActivationId(user.id),
      //   );
      //
      //   const list = await this.getterUserActivationStatusService.run(
      //     userActivationOnly.id.value,
      //     {
      //       lowerAge: userActivationOnly.ageLowerFilter,
      //       upperAge: userActivationOnly.ageUpperFilter,
      //       distance: userActivationOnly.distanceFilter,
      //     },
      //   );
      //   this.wss
      //     .to(userActivationOnly.userId.value)
      //     .emit(ChannelName.IAM_ACTIVE, list);
      // }
      this.wss
        .to(lastUserActiveStill.userId.value)
        .emit(ChannelName.IAM_ACTIVE, list);
    } catch (error) {
      console.error('UpdaterUserActivationLatLngGateway', error);
      client.disconnect();
    }
  }
}
