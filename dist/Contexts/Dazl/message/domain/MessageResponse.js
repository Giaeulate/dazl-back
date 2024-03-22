"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponse = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
class MessageResponse extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
    }
    isEmpty() {
        return this.value === '';
    }
}
exports.MessageResponse = MessageResponse;
//# sourceMappingURL=MessageResponse.js.map