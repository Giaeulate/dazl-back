import { Inject, Injectable } from '@nestjs/common';
import { UserBlocked } from '../../domain/UserBlocked';
import { USER_BLOCK_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';

@Injectable()
export class UserBlockedAllSearcher {
  constructor(
    @Inject(USER_BLOCK_REPOSITORY)
    private readonly repository: UserBlockedRepository,
  ) {}

  public async run(): Promise<Array<UserBlocked>> {
    return await this.repository.searchAll();
  }
}
