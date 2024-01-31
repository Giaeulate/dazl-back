import { Module } from '@nestjs/common';
import { UserBlockedUnblocker } from '../../../../../Contexts/Dazl/user-blocked/application/unblock/UserBlockedUnblocker';
import { UserBlockedActiveSearcher } from '../../../../../Contexts/Dazl/user-blocked/application/search-active/UserBlockedActiveSearcher';
import { UserBlockedBlocker } from '../../../../../Contexts/Dazl/user-blocked/application/block/UserBlockedBlocker';
import { UserBlockedByUserSearcher } from '../../../../../Contexts/Dazl/user-blocked/application/search-by-user/UserBlockedByUserSearcher';
import { UserBlockedAllActiveSearcher } from '../../../../../Contexts/Dazl/user-blocked/application/search-all-active/UserBlockedAllActiveSearcher';
import { UserBlockedAllSearcher } from '../../../../../Contexts/Dazl/user-blocked/application/search-all/UserBlockedAllSearcher';
import { PostUserBlockedController } from '../../controllers/PostUserBlockedController';
import { GetUserBlockedController } from '../../controllers/GetUserBlockedController';
import { PutUserBlockedController } from '../../controllers/PutUserBlockedController';

@Module({
  imports: [],
  controllers: [
    PostUserBlockedController,
    GetUserBlockedController,
    PutUserBlockedController,
  ],
  providers: [
    UserBlockedUnblocker,
    UserBlockedActiveSearcher,
    UserBlockedBlocker,
    UserBlockedByUserSearcher,
    UserBlockedAllActiveSearcher,
    UserBlockedAllSearcher,
  ],
  exports: [],
})
export class UserBlockedModule {}
