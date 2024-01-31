import { Module } from '@nestjs/common';
import { ChannelsUserByUserGetController } from '../../controllers/channels-user-by-user-get.controller';
import { GetterChannelByUserService } from '../../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
import { GetterUnreadMessageService } from '../../../../../Contexts/Dazl/message/application/getter-unread/getter-unread-message.service';
import { UpdateActiveChatSender } from '../../../../../Contexts/Dazl/channel-user/application/SendUpdatedActiveChat/UpdateActiveChatSender';
import { ChannelByUserActivationFinder } from '../../../../../Contexts/Dazl/channel-user/application/FindByUserActivationId/ChannelByUserActivationFinder';
import { SendUpdatedActiveChatOnUserActivationDeactivated } from '../../../../../Contexts/Dazl/channel-user/application/SendUpdatedActiveChat/SendUpdatedActiveChatOnUserActivationDeactivated';
import { SendUpdatedActiveChatOnUserActivationActivated } from '../../../../../Contexts/Dazl/channel-user/application/SendUpdatedActiveChat/SendUpdatedActiveChatOnUserActivationActivated';
import { ChannelUserByChannelFinder } from '../../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder';
import { ChannelsAvailableGetter } from '../../../../../Contexts/Dazl/channel-user/application/GetChannelsAvailable/ChannelsAvailableGetter';
import { HideChannelUser } from '../../../../../Contexts/Dazl/channel-user/application/hide/HideChannelUser';
import { PutChannelUserHideController } from '../../controllers/PutChannelUserHideController';

@Module({
  imports: [],
  providers: [
    GetterChannelByUserService,
    GetterUnreadMessageService,
    UpdateActiveChatSender,
    ChannelByUserActivationFinder,
    SendUpdatedActiveChatOnUserActivationDeactivated,
    SendUpdatedActiveChatOnUserActivationActivated,
    ChannelUserByChannelFinder,
    ChannelsAvailableGetter,
    HideChannelUser,
  ],
  controllers: [ChannelsUserByUserGetController, PutChannelUserHideController],
})
export class ChannelUserByUserModule {}
