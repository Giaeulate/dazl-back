import { Inject, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from '../../../users/domain/User';
import { USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../../users/domain/UserRepository';
import { UserId } from '../../../users/domain/UserId';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}
@Injectable()
export class SendMessageWsService {
  private connectedClients: ConnectedClients = {};

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async registerClient(client: Socket, userId: string) {
    const user = await this.userRepository.search(new UserId(userId));
    if (!user) throw new Error('User not found');

    this.checkUserConnection(user);

    this.connectedClients[client.id] = {
      socket: client,
      user: user,
    };
  }

  removeClient(clientId: string): void {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }

  private checkUserConnection(user: User) {
    for (const clientId of Object.keys(this.connectedClients)) {
      const connectedClient = this.connectedClients[clientId];

      if (connectedClient.user.id === user.id) {
        connectedClient.socket.disconnect();
        break;
      }
    }
  }
}
