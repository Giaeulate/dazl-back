import { ChannelId } from '../../channel/domain/ChannelId';
import { UserActivationId } from '../../user_activation/domain/UserActivationId';
import { ChannelUserId } from './ChannelUserId';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { ChannelUserSomeoneInvitedMe } from './ChannelUserSomeoneInvitedMe';
import { ChannelUserIInvited } from './ChannelUserIInvited';
import { ChannelUserHide } from './ChannelUserHide';

export class ChannelUser extends AggregateRoot {
  get hide(): ChannelUserHide {
    return this._hide;
  }

  set hide(value: ChannelUserHide) {
    this._hide = value;
  }
  id: ChannelUserId;
  channelId: ChannelId;
  userActivationId: UserActivationId;
  iInvited: ChannelUserIInvited;
  someoneInvitedMe: ChannelUserSomeoneInvitedMe;
  private _hide: ChannelUserHide;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;

  constructor(
    id: ChannelUserId,
    channelId: ChannelId,
    userActivationId: UserActivationId,
    iInvited: ChannelUserIInvited,
    someoneInvitedMe: ChannelUserSomeoneInvitedMe,
  ) {
    super();
    this.id = id;
    this.channelId = channelId;
    this.userActivationId = userActivationId;
    this.iInvited = iInvited;
    this._hide = new ChannelUserHide(0);
    this.someoneInvitedMe = someoneInvitedMe;
    this.createdAt = new CreatedAt(new Date().toISOString());
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }

  public static create(plainData: {
    id: string;
    channelId: string;
    userActivationId: string;
  }): ChannelUser {
    const channelUserFromPrimitives = ChannelUser.fromPrimitives({
      ...plainData,
      someoneInvitedMe: '',
      iInvited: 1,
    });
    const channelUser = new ChannelUser(
      channelUserFromPrimitives.id,
      channelUserFromPrimitives.channelId,
      channelUserFromPrimitives.userActivationId,
      new ChannelUserIInvited(0),
      new ChannelUserSomeoneInvitedMe(''),
    );
    return channelUser;
  }
  public static fromPrimitives(plainData: {
    id: string;
    channelId: string;
    userActivationId: string;
    iInvited: number;
    someoneInvitedMe: string;
  }): ChannelUser {
    return new ChannelUser(
      new ChannelUserId(plainData.id),
      new ChannelId(plainData.channelId),
      new UserActivationId(plainData.userActivationId),
      new ChannelUserIInvited(plainData.iInvited),
      new ChannelUserSomeoneInvitedMe(plainData.someoneInvitedMe),
    );
  }

  public disguise(): void {
    this._hide = new ChannelUserHide(1);
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      channelId: this.channelId.value,
      userActivationId: this.userActivationId.value,
    };
  }
}
