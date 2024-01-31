import { Module } from '@nestjs/common';
import { FrequencyGetterByRangeReportService } from '../../../../../Contexts/Dazl/reports/application/frequency-getter-by-range/frequency-getter-by-range-report.service';
import { ReportUsersActiveRangeController } from '../../controllers/report-users-active-range.controller';
import { FrequencyGetterByRangeAndDateReportService } from '../../../../../Contexts/Dazl/reports/application/frequency-getter-by-range/frequency-getter-by-range-and-date-report.service';
import { ReportUsersActiveRangeByDateController } from '../../controllers/report-users-active-range-by-date.controller';

@Module({
  controllers: [ReportUsersActiveRangeByDateController],
  providers: [FrequencyGetterByRangeAndDateReportService],
})
export class ReportUsersActiveRangeByDateModule {}
