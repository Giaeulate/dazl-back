"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLiveStatusInactivedDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class UserLiveStatusInactivedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, eventId, occurredOn, userId, }) {
        super({
            aggregateId,
            eventId,
            occurredOn,
            eventName: UserLiveStatusInactivedDomainEvent.EVENT_NAME,
        });
        this.userId = userId;
    }
    static fromPrimitives(params) {
        return new UserLiveStatusInactivedDomainEvent({
            aggregateId: params.aggregateId,
            eventId: params.eventId,
            occurredOn: params.occurredOn,
            userId: params.attributes.userId,
        });
    }
    toPrimitives() {
        return {
            userId: this.userId,
        };
    }
}
exports.UserLiveStatusInactivedDomainEvent = UserLiveStatusInactivedDomainEvent;
UserLiveStatusInactivedDomainEvent.EVENT_NAME = 'user_live_status_inactived';
//# sourceMappingURL=UserLiveStatusInactivedDomainEvent.js.map