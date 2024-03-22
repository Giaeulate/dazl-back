"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventId = void 0;
const Uuid_1 = require("../../../Shared/domain/value-object/Uuid");
class EventId extends Uuid_1.Uuid {
    constructor(value) {
        super(value);
    }
}
exports.EventId = EventId;
//# sourceMappingURL=EventId.js.map