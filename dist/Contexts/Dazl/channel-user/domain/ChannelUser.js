"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelUser = void 0;
const ChannelId_1 = require("../../channel/domain/ChannelId");
const UserActivationId_1 = require("../../user_activation/domain/UserActivationId");
const ChannelUserId_1 = require("./ChannelUserId");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const ChannelUserSomeoneInvitedMe_1 = require("./ChannelUserSomeoneInvitedMe");
const ChannelUserIInvited_1 = require("./ChannelUserIInvited");
const ChannelUserHide_1 = require("./ChannelUserHide");
class ChannelUser extends AggregateRoot_1.AggregateRoot {
    get hide() {
        return this._hide;
    }
    set hide(value) {
        this._hide = value;
    }
    constructor(id, channelId, userActivationId, iInvited, someoneInvitedMe) {
        super();
        this.id = id;
        this.channelId = channelId;
        this.userActivationId = userActivationId;
        this.iInvited = iInvited;
        this._hide = new ChannelUserHide_1.ChannelUserHide(0);
        this.someoneInvitedMe = someoneInvitedMe;
        this.createdAt = new CreatedAt_1.CreatedAt(new Date().toISOString());
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
    static create(plainData) {
        const channelUserFromPrimitives = ChannelUser.fromPrimitives(Object.assign(Object.assign({}, plainData), { someoneInvitedMe: '', iInvited: 1 }));
        const channelUser = new ChannelUser(channelUserFromPrimitives.id, channelUserFromPrimitives.channelId, channelUserFromPrimitives.userActivationId, new ChannelUserIInvited_1.ChannelUserIInvited(0), new ChannelUserSomeoneInvitedMe_1.ChannelUserSomeoneInvitedMe(''));
        return channelUser;
    }
    static fromPrimitives(plainData) {
        return new ChannelUser(new ChannelUserId_1.ChannelUserId(plainData.id), new ChannelId_1.ChannelId(plainData.channelId), new UserActivationId_1.UserActivationId(plainData.userActivationId), new ChannelUserIInvited_1.ChannelUserIInvited(plainData.iInvited), new ChannelUserSomeoneInvitedMe_1.ChannelUserSomeoneInvitedMe(plainData.someoneInvitedMe));
    }
    disguise() {
        this._hide = new ChannelUserHide_1.ChannelUserHide(1);
    }
    toPrimitives() {
        return {
            id: this.id.value,
            channelId: this.channelId.value,
            userActivationId: this.userActivationId.value,
        };
    }
}
exports.ChannelUser = ChannelUser;
//# sourceMappingURL=ChannelUser.js.map