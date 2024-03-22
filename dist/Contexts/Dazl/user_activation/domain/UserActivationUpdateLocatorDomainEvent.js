"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationUpdateLocatorDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class UserActivationUpdateLocatorDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, eventId, occurredOn, socketId, id, }) {
        super({
            eventName: UserActivationUpdateLocatorDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn,
        });
        this.socketId = socketId;
        this.id = id;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new UserActivationUpdateLocatorDomainEvent({
            aggregateId,
            eventId,
            occurredOn,
            socketId: attributes.socketId,
        });
    }
    toPrimitives() {
        return {
            socketId: this.socketId,
            id: this.id,
        };
    }
}
exports.UserActivationUpdateLocatorDomainEvent = UserActivationUpdateLocatorDomainEvent;
UserActivationUpdateLocatorDomainEvent.EVENT_NAME = 'user_activation.update_locator';
//# sourceMappingURL=UserActivationUpdateLocatorDomainEvent.js.map