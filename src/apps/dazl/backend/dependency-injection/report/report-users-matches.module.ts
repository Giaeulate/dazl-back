import { Module } from '@nestjs/common';
import { ReportUsersMatchesController } from '../../controllers/report-users-matches.controller';
import { GetterMatchesInvitationService } from '../../../../../Contexts/Dazl/reports/application/getter-matches/getter-matches-invitation.service';
import { FinderAllInvitationService } from '../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service';

@Module({
  controllers: [ReportUsersMatchesController],
  providers: [GetterMatchesInvitationService, FinderAllInvitationService],
})
export class ReportUsersMatchesModule {}
