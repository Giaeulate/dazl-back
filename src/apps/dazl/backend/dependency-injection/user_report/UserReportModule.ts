import { Module } from '@nestjs/common';
import { PutUsersReportController } from '../../controllers/PutUsersReportController';
import { UserReportCreator } from '../../../../../Contexts/Dazl/UserReports/application/create/UserReportCreator';

@Module({
  providers: [UserReportCreator],
  controllers: [PutUsersReportController],
})
export class UserReportModule {}
