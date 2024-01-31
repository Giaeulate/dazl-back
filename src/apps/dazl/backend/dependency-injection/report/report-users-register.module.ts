import { Module } from '@nestjs/common';
import { ReportUsersRegisterController } from '../../controllers/report-users-register.controller';
import { UsersRegisterReportService } from '../../../../../Contexts/Dazl/reports/application/users-register/users-register-report.service';

@Module({
  controllers: [ReportUsersRegisterController],
  providers: [UsersRegisterReportService],
})
export class ReportUsersRegisterModule {}
