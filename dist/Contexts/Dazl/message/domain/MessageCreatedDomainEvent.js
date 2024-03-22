"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCreatedDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class MessageCreatedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, eventId, text, type, userToId, userFromId, channelId, occurredOn, }) {
        super({
            eventName: MessageCreatedDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn,
        });
        this.text = text;
        this.userToId = userToId;
        this.userFromId = userFromId;
        this.type = type;
        this.channelId = channelId;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new MessageCreatedDomainEvent({
            aggregateId,
            text: attributes.text,
            userToId: attributes.userToId,
            userFromId: attributes.userFromId,
            type: attributes.type,
            channelId: attributes.channelId,
            eventId,
            occurredOn,
        });
    }
    toPrimitives() {
        const { text, userToId, userFromId, type, channelId } = this;
        return {
            text,
            userToId,
            userFromId,
            channelId,
            type,
        };
    }
}
exports.MessageCreatedDomainEvent = MessageCreatedDomainEvent;
MessageCreatedDomainEvent.EVENT_NAME = 'message.created';
//# sourceMappingURL=MessageCreatedDomainEvent.js.map