import { Module } from '@nestjs/common';
import { ReadMessageController } from '../../controllers/read-message.controller';
import { ReadMessageService } from '../../../../../Contexts/Dazl/message/application/read/read-message.service';
import { FinderAllMessageService } from '../../../../../Contexts/Dazl/message/application/finder-all/finder-all-message.service';
import { GetterUnreadMessageService } from '../../../../../Contexts/Dazl/message/application/getter-unread/getter-unread-message.service';
import { MessageDesactive } from '../../../../../Contexts/Dazl/message/application/Desactive/MessageDesactive';
import { PutMessageDesactiveController } from '../../controllers/PutMessageDesactiveController';

@Module({
  controllers: [ReadMessageController, PutMessageDesactiveController],
  providers: [
    ReadMessageService,
    FinderAllMessageService,
    GetterUnreadMessageService,
    MessageDesactive,
  ],
})
export class ReadMessageModule {}
