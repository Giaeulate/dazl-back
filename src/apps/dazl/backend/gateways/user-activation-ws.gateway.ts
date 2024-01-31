import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserActivationRequestDto } from '../../../../Contexts/Dazl/user_activation/application/dto/UserActivationRequestDto';
import { UnauthorizedException } from '@nestjs/common';
import { FinderActiveUsersWsService } from '../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service';
import { ChannelName } from './constants';
import { UsersActiveDto } from '../../../../Contexts/Dazl/user_activation/domain/dto/UsersActiveDto';
import { UserActivationCreatorOrActivatorService } from '../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service';
import { ManagerUserStateService } from '../../../../Contexts/Dazl/user_activation/application/manager/manager-user-state.service';
import { UserVerifierService } from '../../../../Contexts/Shared/application/user-verifier.service';
import { UpdaterUserService } from '../../../../Contexts/Dazl/users/application/updater/updater-user.service';
import { RedisIoAdapter } from '../adapters/RedisIoAdapter';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';
import { UserLiveAllByUserSearcher } from '../../../../Contexts/Dazl/user-live/application/search-all-by-user/UserLiveAllByUserSearcher';
import { UserLiveByUserCreator } from '../../../../Contexts/Dazl/user-live/application/create-by-user/UserLiveByUserCreator';

export interface CustomSocket extends Socket {
  userID: string;
  token: string;
}

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket'],
  adapter: new RedisIoAdapter(),
})
export class UserActivationWsGateway
  implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly userVerifierService: UserVerifierService,
    private readonly finderActiveUserWsService: FinderActiveUsersWsService,
    private readonly userActivationCreatorOrActivatorService: UserActivationCreatorOrActivatorService,
    private readonly managerUserStateService: ManagerUserStateService,
    private readonly updaterUserService: UpdaterUserService,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
    private readonly activationFinder: UserActivationFinder,
    private readonly liveAllByUserSearcher: UserLiveAllByUserSearcher,
    private readonly liveByUserCreator: UserLiveByUserCreator,
  ) {}

  afterInit() {
    this.wss.use(async (socket: CustomSocket, next) => {
      try {
        const payload = this.userVerifierService.verifyUser(socket);
        const token = socket.handshake.headers.authentication as string;

        if (!payload) {
          this.disconnect(socket);
          return;
        }
        socket.userID = payload?.id?.toString();
        socket.token = token;

        next();
      } catch (error) {
        console.error(error);
        socket.disconnect();
      }
    });
  }

  @SubscribeMessage(ChannelName.ACTIVE_USER)
  async activeUser(
    client: CustomSocket,
    activationRequestDto: UserActivationRequestDto,
  ): Promise<void> {
    console.log('activeUser', activationRequestDto);
    try {
      const payload = this.userVerifierService.verifyUser(client);
      if (!payload) {
        this.disconnect(client);
        return;
      }
      const userActivation =
        await this.userActivationCreatorOrActivatorService.run(
          payload.id,
          activationRequestDto,
          client.id,
          client.token,
        );

      let lives = await this.liveAllByUserSearcher.run(
        userActivation.userId.value,
      );
      if (lives.length === 0) {
        await this.liveByUserCreator.run({
          userId: userActivation.userId.value,
        });
      }
      await this.updaterUserService.run(userActivation.userId, {
        tokenFirebase: activationRequestDto.tokenFirebase,
      });

      const userActivations = await this.finderActiveUserWsService.run(
        userActivation,
      );

      const usersActive = new UsersActiveDto(userActivation.id.value);
      usersActive.listOfPossibleMatches = userActivations;

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
        this.wss
          .to(userActivationOnly.userId.value)
          .emit(ChannelName.IAM_ACTIVE, list);
      }
      client.emit(ChannelName.USERS_ACTIVE, list);
      client.emit(ChannelName.IAM_ACTIVE, list);
    } catch (e) {
      console.error('Error activeUser', e);
    }
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  async handleDisconnect(client: CustomSocket): Promise<void> {
    try {
      console.log('Client disconnected UserActivationWsGateway', client.id);
      await this.managerUserStateService.deactivateUser({ client });
    } catch (e) {
      console.error('Error handleDisconnect', e);
    }
  }

  async handleConnection(client: CustomSocket): Promise<void> {
    try {
      client.join(client.userID);
      // client.join('room2');
      console.log('Client connected UserActivationWsGateway', client.id);
      await this.managerUserStateService.activeUser({ client });
      // client.to('room1').emit('iam-active', 'hola');
      // this.wss.to('room1').emit('iam-active', 'hola');
    } catch (e) {
      console.error('Error handleConnection', e);
    }
  }
}
