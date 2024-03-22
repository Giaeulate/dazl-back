"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelActive = void 0;
const IntValueObject_1 = require("../../../Shared/domain/value-object/IntValueObject");
class ChannelActive extends IntValueObject_1.NumberValueObject {
    constructor(value) {
        super(value);
        this.value = value;
    }
    isActive() {
        return this.value === 1;
    }
}
exports.ChannelActive = ChannelActive;
//# sourceMappingURL=ChannelActive.js.map