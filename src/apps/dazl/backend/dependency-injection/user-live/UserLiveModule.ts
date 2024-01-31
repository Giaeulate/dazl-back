import { Module } from '@nestjs/common';
import { UserLiveByUserCreator } from '../../../../../Contexts/Dazl/user-live/application/create-by-user/UserLiveByUserCreator';
import { UserLiveCreator } from '../../../../../Contexts/Dazl/user-live/application/create/UserLiveCreator';
import { UserLiveAllByUserSearcher } from '../../../../../Contexts/Dazl/user-live/application/search-all-by-user/UserLiveAllByUserSearcher';
import { UserLiveActive } from '../../../../../Contexts/Dazl/user-live/application/active/UserLiveActive';
import { UserLiveDesactive } from '../../../../../Contexts/Dazl/user-live/application/desactive/UserLiveDesactive';
import { UserLiveChangeStatusOnStatusInactived } from '../../../../../Contexts/Dazl/user-live/application/change-status-holding/UserLiveChangeStatusOnStatusInactived';
import { UserLiveStatusHoldingChanger } from '../../../../../Contexts/Dazl/user-live/application/change-status-holding/UserLiveStatusHoldingChanger';

@Module({
  providers: [
    UserLiveByUserCreator,
    UserLiveCreator,
    UserLiveAllByUserSearcher,
    UserLiveActive,
    UserLiveDesactive,
    UserLiveChangeStatusOnStatusInactived,
    UserLiveStatusHoldingChanger,
  ],
})
export class UserLiveModule {}
