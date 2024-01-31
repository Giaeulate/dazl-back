import { Module } from '@nestjs/common';
import { ReportUsersLatLogController } from '../../controllers/report-users-lat-log.controller';
import { UsersActivationLatLogService } from '../../../../../Contexts/Dazl/reports/application/users-activation-lat-log/users-activation-lat-log.service';

@Module({
  controllers: [ReportUsersLatLogController],
  providers: [UsersActivationLatLogService],
})
export class ReportUsersLatLogModule {}
