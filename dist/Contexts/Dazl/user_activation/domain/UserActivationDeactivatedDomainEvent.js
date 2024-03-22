"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationDeactivatedDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class UserActivationDeactivatedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, userId, eventId, occurredOn, }) {
        super({
            eventName: UserActivationDeactivatedDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn,
        });
        this.userId = userId;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new UserActivationDeactivatedDomainEvent({
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
exports.UserActivationDeactivatedDomainEvent = UserActivationDeactivatedDomainEvent;
UserActivationDeactivatedDomainEvent.EVENT_NAME = 'user_activation.deactivated';
//# sourceMappingURL=UserActivationDeactivatedDomainEvent.js.map