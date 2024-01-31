import { Inject, Injectable } from '@nestjs/common';
import { ComplaintRepository } from '../../domain/ComplaintRepository';
import {
  COMPLAINT_REPOSITORY,
  MESSAGE_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { Complaint } from '../../domain/Complaint';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { FinderMessageService } from '../../../message/application/finder/finder-message.service';
import { MessageId } from '../../../message/domain/MessageId';
import { MessageRepository } from '../../../message/domain/MessageRepository';
import { MessageReported } from '../../../message/domain/MessageReported';

@Injectable()
export class CreatorComplaint {
  constructor(
    @Inject(COMPLAINT_REPOSITORY)
    private readonly complaintRepository: ComplaintRepository,
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    private readonly finderMessageService: FinderMessageService,
  ) {}

  async run(plainData: { messageId: string; complainantId: string }) {
    const message = await this.finderMessageService.run(
      new MessageId(plainData.messageId),
    );
    const complaint = Complaint.create({
      id: Uuid.random().toString(),
      messageId: message.id.value,
      complainantId: plainData.complainantId,
    });
    console.log('complaint', complaint);
    await this.complaintRepository.save(complaint);
    message.reported = new MessageReported(true);
    await this.messageRepository.save(message);
  }
}
