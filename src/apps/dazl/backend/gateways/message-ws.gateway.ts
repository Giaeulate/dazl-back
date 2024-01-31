import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageDto } from '../../../../Contexts/Dazl/message/domain/dto/request/MessageDto';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';
import { CreatorMessageService } from '../../../../Contexts/Dazl/message/application/create/creator-message.service';
import { ChannelName } from './constants';
import { MessageTypeEnum } from '../../../../Contexts/Dazl/message/domain/MessageType';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { ConvertMessageResponse } from '../../../../Contexts/Dazl/message/application/ConvertResponse/ConvertMessageResponse';
import { CustomSocket } from './user-activation-ws.gateway';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class MessageWsGateway {
  @WebSocketServer() wss: Server;

  constructor(
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly convertMessageResponse: ConvertMessageResponse,
    private readonly creatorMessageService: CreatorMessageService,
  ) {}

  @SubscribeMessage(ChannelName.MESSAGE_FROM_CLIENT)
  async handleMessage(client: CustomSocket, payload: MessageDto) {
    try {
      const userActivationTo = await this.finderUserActivationService.run(
        new UserActivationId(payload.userToId),
      );
      const message = await this.creatorMessageService.run(
        payload,
        MessageTypeEnum.TEXT,
      );
      const messageResponse = await this.convertMessageResponse.run({
        message: message,
        messageFile: null,
      });
      console.log('messageResponse', messageResponse);
      client.emit(ChannelName.MESSAGE_FROM_SERVER, messageResponse);
      client.emit(ChannelName.CHECK_SENT_MESSAGE, messageResponse);
      this.wss
        .to(userActivationTo.userId.value)
        .emit(ChannelName.MESSAGE_FROM_SERVER, messageResponse);
    } catch (error) {
      console.log(error);
    }
  }
}
