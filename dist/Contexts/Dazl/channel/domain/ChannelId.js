"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelId = void 0;
const Uuid_1 = require("../../../Shared/domain/value-object/Uuid");
class ChannelId extends Uuid_1.Uuid {
    constructor(value) {
        super(value);
        this.value = value;
    }
}
exports.ChannelId = ChannelId;
//# sourceMappingURL=ChannelId.js.map