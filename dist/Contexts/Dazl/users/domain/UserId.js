"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const Uuid_1 = require("../../../Shared/domain/value-object/Uuid");
class UserId extends Uuid_1.Uuid {
    constructor(value) {
        super(value);
    }
}
exports.UserId = UserId;
//# sourceMappingURL=UserId.js.map