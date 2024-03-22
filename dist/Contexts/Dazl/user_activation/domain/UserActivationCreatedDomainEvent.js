"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationCreatedDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class UserActivationCreatedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, socketId, eventId, occurredOn, }) {
        super({
            eventName: UserActivationCreatedDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn,
        });
        this.socketId = socketId;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new UserActivationCreatedDomainEvent({
            aggregateId,
            socketId: attributes.socketId,
            eventId,
            occurredOn,
        });
    }
    toPrimitives() {
        const { socketId } = this;
        return {
            socketId,
        };
    }
}
exports.UserActivationCreatedDomainEvent = UserActivationCreatedDomainEvent;
UserActivationCreatedDomainEvent.EVENT_NAME = 'user.activation.created';
//# sourceMappingURL=UserActivationCreatedDomainEvent.js.map