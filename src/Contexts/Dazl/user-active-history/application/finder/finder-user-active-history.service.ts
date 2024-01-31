import { Inject, Injectable } from '@nestjs/common';
import { UserActiveHistory } from '../../domain/UserActiveHistory';
import { USER_ACTIVE_HISTORY_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActiveHistoryRepository } from '../../domain/UserActiveHistoryRepository';
import { UserActiveHistoryId } from '../../domain/UserActiveHistoryId';

@Injectable()
export class FinderUserActiveHistoryService {
  constructor(
    @Inject(USER_ACTIVE_HISTORY_REPOSITORY)
    private readonly userActiveHistoryRepository: UserActiveHistoryRepository,
  ) {}

  async run(id: UserActiveHistoryId): Promise<UserActiveHistory> {
    const userActiveHistory = await this.userActiveHistoryRepository.search(id);
    this.ensureUserActiveHistoryExists(userActiveHistory);
    return userActiveHistory;
  }

  private ensureUserActiveHistoryExists(userActiveHistory: UserActiveHistory) {
    if (!userActiveHistory) {
      throw new Error('UserActiveHistory does not exist');
    }
  }
}
