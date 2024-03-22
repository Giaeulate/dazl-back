"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPopularity = void 0;
const InvalidArgumentError_1 = require("../../../Shared/domain/value-object/InvalidArgumentError");
const IntValueObject_1 = require("../../../Shared/domain/value-object/IntValueObject");
class UserPopularity extends IntValueObject_1.NumberValueObject {
    constructor(value) {
        super(value);
        this.value = value;
        this.ensureValueIsNumber(value);
    }
    ensureValueIsNumber(value) {
        if (typeof value !== 'number') {
            throw new InvalidArgumentError_1.InvalidArgumentError(`The User Popularity <${value}> is not a number`);
        }
    }
}
exports.UserPopularity = UserPopularity;
//# sourceMappingURL=UserPopularity.js.map