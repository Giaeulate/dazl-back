"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationId = void 0;
const Uuid_1 = require("../../../Shared/domain/value-object/Uuid");
class UserActivationId extends Uuid_1.Uuid {
    constructor(value) {
        super(value);
        this.value = value;
    }
}
exports.UserActivationId = UserActivationId;
//# sourceMappingURL=UserActivationId.js.map