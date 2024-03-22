"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageId = void 0;
const Uuid_1 = require("../../../Shared/domain/value-object/Uuid");
class MessageId extends Uuid_1.Uuid {
    constructor(value) {
        super(value);
    }
}
exports.MessageId = MessageId;
//# sourceMappingURL=MessageId.js.map