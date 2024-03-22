import { Socket } from 'socket.io';
import { UserRepository } from '../../../users/domain/UserRepository';
export declare class SendMessageWsService {
    private readonly userRepository;
    private connectedClients;
    constructor(userRepository: UserRepository);
    registerClient(client: Socket, userId: string): Promise<void>;
    removeClient(clientId: string): void;
    getConnectedClients(): string[];
    private checkUserConnection;
}
