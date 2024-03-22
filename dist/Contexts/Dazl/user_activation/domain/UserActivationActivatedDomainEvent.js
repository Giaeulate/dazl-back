"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationActivatedDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class UserActivationActivatedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, userId, eventId, occurredOn, }) {
        super({
            eventName: UserActivationActivatedDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn,
        });
        this.userId = userId;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new UserActivationActivatedDomainEvent({
            aggregateId,
            userId: attributes.userId,
            eventId,
            occurredOn,
        });
    }
    toPrimitives() {
        const { userId } = this;
        return {
            userId,
        };
    }
}
exports.UserActivationActivatedDomainEvent = UserActivationActivatedDomainEvent;
UserActivationActivatedDomainEvent.EVENT_NAME = 'user_activation.activated';
//# sourceMappingURL=UserActivationActivatedDomainEvent.js.map