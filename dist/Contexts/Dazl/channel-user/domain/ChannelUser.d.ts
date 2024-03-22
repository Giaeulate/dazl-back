import { ChannelId } from '../../channel/domain/ChannelId';
import { UserActivationId } from '../../user_activation/domain/UserActivationId';
import { ChannelUserId } from './ChannelUserId';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { ChannelUserSomeoneInvitedMe } from './ChannelUserSomeoneInvitedMe';
import { ChannelUserIInvited } from './ChannelUserIInvited';
import { ChannelUserHide } from './ChannelUserHide';
export declare class ChannelUser extends AggregateRoot {
    get hide(): ChannelUserHide;
    set hide(value: ChannelUserHide);
    id: ChannelUserId;
    channelId: ChannelId;
    userActivationId: UserActivationId;
    iInvited: ChannelUserIInvited;
    someoneInvitedMe: ChannelUserSomeoneInvitedMe;
    private _hide;
    createdAt: CreatedAt;
    updatedAt: UpdatedAt;
    constructor(id: ChannelUserId, channelId: ChannelId, userActivationId: UserActivationId, iInvited: ChannelUserIInvited, someoneInvitedMe: ChannelUserSomeoneInvitedMe);
    static create(plainData: {
        id: string;
        channelId: string;
        userActivationId: string;
    }): ChannelUser;
    static fromPrimitives(plainData: {
        id: string;
        channelId: string;
        userActivationId: string;
        iInvited: number;
        someoneInvitedMe: string;
    }): ChannelUser;
    disguise(): void;
    toPrimitives(): any;
}
