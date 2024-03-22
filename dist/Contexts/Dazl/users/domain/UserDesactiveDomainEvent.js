"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDesactiveDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class UserDesactiveDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, id, eventId, occurredOn, }) {
        super({
            eventName: UserDesactiveDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn,
        });
        this.id = id;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new UserDesactiveDomainEvent({
            aggregateId,
            id: attributes.id,
            eventId,
            occurredOn,
        });
    }
    toPrimitives() {
        const { id } = this;
        return {
            id,
        };
    }
}
exports.UserDesactiveDomainEvent = UserDesactiveDomainEvent;
UserDesactiveDomainEvent.EVENT_NAME = 'dazl.user.desactive';
//# sourceMappingURL=UserDesactiveDomainEvent.js.map