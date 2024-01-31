import { Inject, Injectable } from '@nestjs/common';
import { FinderUserActiveHistoryService } from '../finder/finder-user-active-history.service';
import { UserActiveHistoryId } from '../../domain/UserActiveHistoryId';
import { UserId } from '../../../users/domain/UserId';
import { UserActiveHistoryStartTime } from '../../domain/UserActiveHistoryStartTime';
import { UserActiveHistoryEndTime } from '../../domain/UserActiveHistoryEndTime';
import { UserActiveHistoryStatus } from '../../domain/UserActiveHistoryStatus';
import { USER_ACTIVE_HISTORY_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActiveHistoryRepository } from '../../domain/UserActiveHistoryRepository';
import { UpdatedAt } from '../../../../Shared/domain/UpdatedAt';

@Injectable()
export class UpdaterUserActiveHistoryService {
  constructor(
    @Inject(USER_ACTIVE_HISTORY_REPOSITORY)
    private readonly userActiveHistoryRepository: UserActiveHistoryRepository,
    private readonly finderUserActiveHistoryService: FinderUserActiveHistoryService,
  ) {}

  async run(
    id: UserActiveHistoryId,
    plainData: {
      userId?: UserId;
      startTime?: string;
      endTime?: string;
      status?: string;
    },
  ): Promise<void> {
    const userActiveHistory = await this.finderUserActiveHistoryService.run(id);
    userActiveHistory.userId = plainData.userId
      ? new UserId(plainData.userId.value)
      : userActiveHistory.userId;
    userActiveHistory.startTime = plainData.startTime
      ? new UserActiveHistoryStartTime(plainData.startTime)
      : userActiveHistory.startTime;
    userActiveHistory.endTime = plainData.endTime
      ? new UserActiveHistoryEndTime(plainData.endTime)
      : userActiveHistory.endTime;
    userActiveHistory.status = plainData.status
      ? new UserActiveHistoryStatus(plainData.status)
      : userActiveHistory.status;

    userActiveHistory.updatedAt = new UpdatedAt(new Date().toISOString());
    await this.userActiveHistoryRepository.save(userActiveHistory);
  }
}
