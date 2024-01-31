import { Module } from '@nestjs/common';
import { ReportUsersActiveController } from '../../controllers/report-users-active.controller';
import { UsersActiveReportService } from '../../../../../Contexts/Dazl/reports/application/users-active/users-active-report.service';
import { GetterByGenderUserActivationService } from '../../../../../Contexts/Dazl/user_activation/application/getter-by-gender/getter-by-gender-user-activation.service';

@Module({
  controllers: [ReportUsersActiveController],
  providers: [UsersActiveReportService, GetterByGenderUserActivationService],
})
export class ReportUsersActiveModule {}
