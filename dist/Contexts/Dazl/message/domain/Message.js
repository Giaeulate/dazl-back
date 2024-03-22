"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const MessageId_1 = require("./MessageId");
const MessageText_1 = require("./MessageText");
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const UserActivationId_1 = require("../../user_activation/domain/UserActivationId");
const ChannelId_1 = require("../../channel/domain/ChannelId");
const MessageIsSent_1 = require("./MessageIsSent");
const MessageActive_1 = require("./MessageActive");
const MessageType_1 = require("./MessageType");
const MessageUserReadId_1 = require("./MessageUserReadId");
const MessageCreatedDomainEvent_1 = require("./MessageCreatedDomainEvent");
const MessageReported_1 = require("./MessageReported");
const MessageResponse_1 = require("./MessageResponse");
class Message extends AggregateRoot_1.AggregateRoot {
    constructor(id, text, isSent, type, active, channelId, useFromId, userToId, userReadId, reported, response) {
        super();
        this.toPrimitives = () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return ({
                id: (_a = this.id) === null || _a === void 0 ? void 0 : _a.value,
                text: (_b = this.text) === null || _b === void 0 ? void 0 : _b.value,
                isSent: (_c = this.isSent) === null || _c === void 0 ? void 0 : _c.value,
                type: (_d = this.type) === null || _d === void 0 ? void 0 : _d.value,
                active: (_e = this.active) === null || _e === void 0 ? void 0 : _e.value,
                channelId: (_f = this.channelId) === null || _f === void 0 ? void 0 : _f.value,
                userFromId: (_g = this.useFromId) === null || _g === void 0 ? void 0 : _g.value,
                userToId: (_h = this.userToId) === null || _h === void 0 ? void 0 : _h.value,
                reported: (_j = this.reported) === null || _j === void 0 ? void 0 : _j.value,
                response: (_k = this.response) === null || _k === void 0 ? void 0 : _k.value,
                createdAt: (_l = this.createdAt) === null || _l === void 0 ? void 0 : _l.value,
                updatedAt: (_m = this.updatedAt) === null || _m === void 0 ? void 0 : _m.value,
            });
        };
        this.id = id;
        this.text = text;
        this.isSent = isSent;
        this.type = type;
        this.active = active;
        this.channelId = channelId;
        this.useFromId = useFromId;
        this.userToId = userToId;
        this.userReadId = userReadId;
        this.reported = reported;
        this.response = response;
        this.createdAt = new CreatedAt_1.CreatedAt(new Date().toISOString());
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
    static create(plainData) {
        const messageFromPrimitives = this.fromPrimitives(Object.assign(Object.assign({}, plainData), { reported: false }));
        const message = new Message(messageFromPrimitives.id, messageFromPrimitives.text, messageFromPrimitives.isSent, messageFromPrimitives.type, messageFromPrimitives.active, messageFromPrimitives.channelId, messageFromPrimitives.useFromId, messageFromPrimitives.userToId, messageFromPrimitives.userToId, messageFromPrimitives.reported, messageFromPrimitives.response);
        message.record(new MessageCreatedDomainEvent_1.MessageCreatedDomainEvent({
            aggregateId: message.id.value,
            text: message.text.value,
            userToId: message.userToId.value,
            userFromId: message.useFromId.value,
            channelId: message.channelId.value,
            type: message.type.value,
        }));
        return message;
    }
    static fromPrimitives(plainData) {
        return new Message(new MessageId_1.MessageId(plainData.id), new MessageText_1.MessageText(plainData.text), new MessageIsSent_1.MessageIsSent(plainData.isSent), new MessageType_1.MessageType(plainData.type), new MessageActive_1.MessageActive(plainData.active), new ChannelId_1.ChannelId(plainData.channelId), new UserActivationId_1.UserActivationId(plainData.userFromId), new UserActivationId_1.UserActivationId(plainData.userToId), new MessageUserReadId_1.MessageUserReadId(plainData.userToId), new MessageReported_1.MessageReported(plainData.reported), new MessageResponse_1.MessageResponse(plainData.response));
    }
    desactive() {
        this.active = new MessageActive_1.MessageActive(0);
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.js.map