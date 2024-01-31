import { Module } from '@nestjs/common';
import { FrequencyGetterByRangeReportService } from '../../../../../Contexts/Dazl/reports/application/frequency-getter-by-range/frequency-getter-by-range-report.service';
import { ReportUsersActiveRangeController } from '../../controllers/report-users-active-range.controller';

@Module({
  controllers: [ReportUsersActiveRangeController],
  providers: [FrequencyGetterByRangeReportService],
})
export class ReportUsersActiveRangeModule {}
