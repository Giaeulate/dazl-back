import { Inject, Injectable } from '@nestjs/common';
import { USER_BLOCK_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
import { UserBlockedAllActiveSearcher } from '../search-all-active/UserBlockedAllActiveSearcher';
import { UserId } from '../../../users/domain/UserId';
import { FinderUser } from '../../../users/application/Finder/FinderUser';
import { GetterLastUserActiveStillService } from '../../../user_activation/application/getter-last-still-active/getter-last-user-active-still.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { File } from 'src/Contexts/Dazl/file/domain/File';

type Params = {
  userId: string;
};

@Injectable()
export class UserBlockedByUserSearcher {
  private readonly userBlockedActiveSearcher: UserBlockedAllActiveSearcher;

  constructor(
    @Inject(USER_BLOCK_REPOSITORY)
    repository: UserBlockedRepository,
    private readonly finderUser: FinderUser,
    private readonly getterLastUserActiveStillService: GetterLastUserActiveStillService,
    private readonly fileFinderService: FileFinderService,
  ) {
    this.userBlockedActiveSearcher = new UserBlockedAllActiveSearcher(
      repository,
    );
  }

  public async run({ userId }: Params): Promise<Array<Response>> {
    const userBlockeds = await this.userBlockedActiveSearcher.run();
    const blockeds = userBlockeds.filter((userBlocked) =>
      userBlocked.userWhoBlocked.equals(new UserId(userId)),
    );
    const map = blockeds.map(async (userBlocked) => {
      const user = await this.finderUser.run(userBlocked.userBlocked);
      if (!user) {
        return;
      }
      const userActivation = await this.getterLastUserActiveStillService.run(
        userBlocked.userBlocked,
      );
      let file: File = null;
      if (userActivation) {
        file = await this.fileFinderService.invoke(userActivation?.fileImageId);
      }

      return {
        id: userBlocked.id.value,
        userBlocked: {
          id: user.id.value,
          gender: user.gender.value,
          age: user.age.value,
          activationImage: userActivation ? file?.location.value : null,
          details: userActivation ? userActivation.details.value : null,
          name: userActivation ? userActivation.name.value : null,
        } as UserBlocked,
        createdAt: userBlocked.createdAt.value,
        updatedAt: userBlocked.updatedAt.value,
      } as Response;
    });
    const result = await Promise.all(map);
    return result ? result.filter((user) => user) : [];
  }
}

type UserBlocked = {
  id: string;
  gender: string;
  age: number;
  activationImage: string;
  details: string;
  name: string;
};

type Response = {
  id: string;
  userBlocked: UserBlocked;
  createdAt: string;
  updatedAt: string;
};
