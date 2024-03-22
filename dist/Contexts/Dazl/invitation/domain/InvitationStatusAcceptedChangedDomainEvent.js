"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationStatusAcceptedChangedDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class InvitationStatusAcceptedChangedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, userActivationFromId, userActivationToId, eventId, occurredOn, }) {
        super({
            eventName: InvitationStatusAcceptedChangedDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn,
        });
        this.userActivationFromId = userActivationFromId;
        this.userActivationToId = userActivationToId;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new InvitationStatusAcceptedChangedDomainEvent({
            aggregateId,
            userActivationFromId: attributes.userActivationFromId,
            userActivationToId: attributes.userActivationToId,
            eventId,
            occurredOn,
        });
    }
    toPrimitives() {
        const { userActivationFromId, userActivationToId } = this;
        return {
            userActivationFromId,
            userActivationToId,
        };
    }
}
exports.InvitationStatusAcceptedChangedDomainEvent = InvitationStatusAcceptedChangedDomainEvent;
InvitationStatusAcceptedChangedDomainEvent.EVENT_NAME = 'invitation.status.accepted.changed';
//# sourceMappingURL=InvitationStatusAcceptedChangedDomainEvent.js.map