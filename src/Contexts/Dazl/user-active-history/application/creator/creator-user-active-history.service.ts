import { Inject, Injectable } from '@nestjs/common';
import { USER_ACTIVE_HISTORY_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActiveHistoryRepository } from '../../domain/UserActiveHistoryRepository';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UserId } from '../../../users/domain/UserId';
import { UserActiveHistory } from '../../domain/UserActiveHistory';

@Injectable()
export class CreatorUserActiveHistoryService {
  constructor(
    @Inject(USER_ACTIVE_HISTORY_REPOSITORY)
    private readonly userActiveHistoryRepository: UserActiveHistoryRepository,
    private readonly userFinderService: UserFinderService,
  ) {}

  async run({
    userId,
    startTime,
    endTime,
  }: {
    userId: UserId;
    startTime: string;
    endTime: string;
  }): Promise<void> {
    const user = await this.userFinderService.invoke(userId);
    if (!user) return;
    const userActiveHistory = UserActiveHistory.create({
      userId: user.id.value,
      startTime: startTime,
      endTime: endTime,
    });
    await this.userActiveHistoryRepository.save(userActiveHistory);
  }
}
