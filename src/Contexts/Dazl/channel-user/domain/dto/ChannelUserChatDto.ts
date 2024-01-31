import { Channel } from '../../../channel/domain/Channel';
import { UsersActiveFileUserDto } from '../../../user_activation/domain/dto/indexDto';
import { ChannelSecondChanceTypes } from '../../../channel/domain/ChannelSecondChance';

export class ChannelUserChatDto {
  id: string;
  name: string;
  thumb: string;
  description: string;
  unreadMessages: number;
  iInvited?: boolean;
  someoneInvitedMe?: string;
  chatCanceled: boolean;
  userConnected: UsersActiveFileUserDto;
  secondChance: boolean;
  createdAt: Date;
  timeLeft: { minutes: number; seconds: number };

  constructor(
    channel: Channel,
    UserActivationDto: UsersActiveFileUserDto,
    unreadMessages: number,
    iInvited: number | null,
    someoneInvitedMe: string | null,
    chatCanceled: number,
    createdAt: Date,
    timeLeft: { minutes: number; seconds: number },
  ) {
    this.id = channel.id.value;
    this.name = channel.name.value;
    this.thumb = channel.thumb.value;
    this.iInvited = iInvited === 1;
    this.someoneInvitedMe = someoneInvitedMe;
    this.description = channel.description.value;
    this.userConnected = UserActivationDto;
    this.unreadMessages = unreadMessages;
    this.chatCanceled = chatCanceled !== 1;
    this.secondChance =
      channel.secondChance.value === ChannelSecondChanceTypes.ACCEPTED;
    this.timeLeft = timeLeft;
    this.createdAt = createdAt;
  }
}
