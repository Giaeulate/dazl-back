import { Inject, Injectable } from '@nestjs/common';
import {
  USER_ACTIVE_HISTORY_REPOSITORY,
  USER_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserActiveHistoryRepository } from '../../domain/UserActiveHistoryRepository';
import { UserRepository } from '../../../users/domain/UserRepository';
import { UserActiveHistory } from '../../domain/UserActiveHistory';
import {
  UserActiveHistoryStatus,
  UserActiveHistoryStatusEnum,
} from '../../domain/UserActiveHistoryStatus';

@Injectable()
export class GetAverageUserActiveService {
  constructor(
    @Inject(USER_ACTIVE_HISTORY_REPOSITORY)
    private readonly userActiveHistoryRepository: UserActiveHistoryRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}
  async run(): Promise<number> {
    const users = await this.userRepository.searchAll();
    const userAveragePromise = users.map(async (user) => {
      const userActiveHistory =
        await this.userActiveHistoryRepository.searchAllByUserId(user.id);
      const average = userActiveHistory
        .filter((value) =>
          value.status.equals(
            new UserActiveHistoryStatus(UserActiveHistoryStatusEnum.CLOSED),
          ),
        )
        .reduce(
          (acc, current) => this.calculateAverage(current, acc),
          0 as number,
        );
      const averageByUser = average / userActiveHistory.length;
      return {
        user: user,
        average: averageByUser,
      };
    });
    const userAverage = await Promise.all(userAveragePromise);
    const average = userAverage.reduce(
      (acc, current) => acc + current.average,
      0 as number,
    );
    return average / userAverage.length;
  }

  private calculateAverage(current: UserActiveHistory, acc: number) {
    const start = new Date(current.startTime.value);
    const end = new Date(current.endTime.value);
    const diff = end.getTime() - start.getTime();
    return acc + diff;
  }
}
