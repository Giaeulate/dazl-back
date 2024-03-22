import { Channel } from '../../../channel/domain/Channel';
import { UsersActiveFileUserDto } from '../../../user_activation/domain/dto/indexDto';
export declare class ChannelUserChatDto {
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
    timeLeft: {
        minutes: number;
        seconds: number;
    };
    constructor(channel: Channel, UserActivationDto: UsersActiveFileUserDto, unreadMessages: number, iInvited: number | null, someoneInvitedMe: string | null, chatCanceled: number, createdAt: Date, timeLeft: {
        minutes: number;
        seconds: number;
    });
}
