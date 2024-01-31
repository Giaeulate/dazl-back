import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_BLOCK_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
import { UserBlocked } from '../../domain/UserBlocked';
import { FinderUser } from '../../../users/application/Finder/FinderUser';
import { UserId } from '../../../users/domain/UserId';
import { User } from '../../../users/domain/User';

type Params = {
  id: string;
  userWhoBlockedId: string;
  userBlockedId: string;
};

@Injectable()
export class UserBlockedBlocker {
  constructor(
    @Inject(USER_BLOCK_REPOSITORY)
    private readonly repository: UserBlockedRepository,
    private readonly finderUser: FinderUser,
  ) {}

  public async run({
    id,
    userWhoBlockedId,
    userBlockedId,
  }: Params): Promise<void> {
    const userWhoBlocked = await this.finderUser.run(
      new UserId(userWhoBlockedId),
    );
    const user = await this.finderUser.run(new UserId(userBlockedId));
    const users = await this.repository.searchByUserWhoBlockedIdAnd(
      new UserId(userWhoBlockedId),
      new UserId(userBlockedId),
    );
    if (users.length > 0) {
      throw new BadRequestException(
        `El usuario <${userWhoBlockedId}> ya ha bloqueado al usuario <${userBlockedId}>`,
      );
    }
    this.ensureUserExist(userWhoBlocked, userWhoBlockedId);
    this.ensureUserExist(user, userBlockedId);
    const userBlocked = UserBlocked.create({
      id,
      userBlocked: userBlockedId,
      userWhoBlocked: userWhoBlockedId,
    });
    await this.repository.save(userBlocked);
  }

  private ensureUserExist(userWhoBlocked: User, userWhoBlockedId: string) {
    if (!userWhoBlocked) {
      throw new NotFoundException(`El usuario <${userWhoBlockedId}> no existe`);
    }
  }
}
