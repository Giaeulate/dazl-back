import { Module } from '@nestjs/common';
import { PostComplaintController } from '../../controllers/PostComplaintController';
import { CreatorComplaint } from '../../../../../Contexts/Dazl/complaint/application/Creator/CreatorComplaint';

@Module({
  providers: [CreatorComplaint],
  controllers: [PostComplaintController],
})
export class ComplaintModule {}
