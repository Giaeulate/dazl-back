import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserId } from '../../../users/domain/UserId';
import { UserReportReason } from '../../domain/UserReportReason';
import { UserReport } from '../../domain/UserReport';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { FinderUser } from '../../../users/application/Finder/FinderUser';
import { User } from '../../../users/domain/User';
import { UserReportRepository } from '../../domain/UserReportRepository';
import { USER_REPORT_REPOSITORY } from '../../../../Shared/domain/constants/constants';

type Params = {
  userWhoReportedId: UserId;
  userWhoWasReportedId: UserId;
  reason: UserReportReason;
};

@Injectable()
export class UserReportCreator {
  constructor(
    private readonly finderUser: FinderUser,
    @Inject(USER_REPORT_REPOSITORY)
    private readonly repository: UserReportRepository,
  ) {}

  async run(params: Params) {
    const { userWhoReportedId, userWhoWasReportedId, reason } = params;
    const userWhoReported = await this.finderUser.run(userWhoReportedId);
    this.ensureUserExist(userWhoReported, userWhoReportedId);
    const userWhoWasReported = await this.finderUser.run(userWhoWasReportedId);
    this.ensureUserExist(userWhoWasReported, userWhoWasReportedId);

    await this.ensureUserCanNotReportAgain(userWhoReportedId);

    const userReport = UserReport.create(
      Uuid.random(),
      userWhoReportedId,
      userWhoWasReportedId,
      reason,
    );
    await this.repository.save(userReport);
  }

  private async ensureUserCanNotReportAgain(user: UserId): Promise<void> {
    const reports = await this.repository.searchByUser(user);
    if (reports.length > 0) {
      throw new BadRequestException('Ya reportaste a este usuario');
    }
  }

  private ensureUserExist(user: User, userId: UserId) {
    if (!user) {
      throw new NotFoundException(`User <${userId.value}> not found`);
    }
  }
}
