import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { GetterLastUserActiveStillService } from '../getter-last-still-active/getter-last-user-active-still.service';
import { UserId } from '../../../users/domain/UserId';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { UserActivationUpdaterService } from '../updater/user-activation-updater.service';
import { FinderUserActivationSocketIdService } from '../finder-socket-id/finder-user-activation-socket-id.service';
import { UserActivationSocketId } from '../../domain/UserActivationSocketId';
import { CreatorUserActiveHistoryService } from '../../../user-active-history/application/creator/creator-user-active-history.service';
import { UserVerifierService } from '../../../../Shared/application/user-verifier.service';

@Injectable()
export class ManagerUserStateService {
  constructor(
    private readonly userVerifierService: UserVerifierService,
    private readonly getterLastUserActiveStillService: GetterLastUserActiveStillService,
    private readonly userActivationUpdaterService: UserActivationUpdaterService,
    private readonly finderUserActivationSocketIdService: FinderUserActivationSocketIdService,
    private readonly creatorUserActiveHistoryService: CreatorUserActiveHistoryService,
  ) {}

  async activeUser({ client }: { client: Socket }): Promise<void> {
    const payload = this.userVerifierService.verifyUser(client);
    // console.log('activeUser', payload);
    if (!payload) {
      client.disconnect();
      return;
    }
    const userActivation = await this.getterLastUserActiveStillService.run(
      new UserId(payload.id),
    );
    if (userActivation) {
      await this.userActivationUpdaterService.run(userActivation.id, {
        socketId: client.id,
        isActiveSocket: IsBoolean.TRUE,
      });
      await this.creatorUserActiveHistoryService.run({
        userId: userActivation.userId,
        startTime: new Date().getTime().toString(),
        endTime: '',
      });
    }
  }

  async deactivateUser({ client }: { client: Socket }): Promise<void> {
    // console.log('deactivateUser');
    // const payload = this.userVerifierService.verifyUser(client);
    const userActivation = await this.finderUserActivationSocketIdService.run(
      new UserActivationSocketId(client.id),
    );
    if (userActivation) {
      await this.userActivationUpdaterService.run(userActivation.id, {
        isActiveSocket: IsBoolean.FALSE,
        socketId: '',
      });
    }
  }
}
