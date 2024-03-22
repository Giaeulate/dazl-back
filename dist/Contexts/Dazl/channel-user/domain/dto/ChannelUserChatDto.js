"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelUserChatDto = void 0;
class ChannelUserChatDto {
    constructor(channel, UserActivationDto, unreadMessages, iInvited, someoneInvitedMe, chatCanceled, createdAt, timeLeft) {
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
            channel.secondChance.value === "accept";
        this.timeLeft = timeLeft;
        this.createdAt = createdAt;
    }
}
exports.ChannelUserChatDto = ChannelUserChatDto;
//# sourceMappingURL=ChannelUserChatDto.js.map