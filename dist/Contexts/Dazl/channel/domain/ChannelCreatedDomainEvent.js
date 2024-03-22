"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelCreatedDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class ChannelCreatedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, eventId, occurredOn, }) {
        super({
            eventName: ChannelCreatedDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn,
        });
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new ChannelCreatedDomainEvent({
            aggregateId,
            eventId,
            occurredOn,
        });
    }
    toPrimitives() {
        return {};
    }
}
exports.ChannelCreatedDomainEvent = ChannelCreatedDomainEvent;
ChannelCreatedDomainEvent.EVENT_NAME = 'channel.created';
//# sourceMappingURL=ChannelCreatedDomainEvent.js.map