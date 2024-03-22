"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActiveDate = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
const InvalidArgumentError_1 = require("../../../Shared/domain/value-object/InvalidArgumentError");
class UserActiveDate extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
        this.value = value;
        this.ensureLengthIsLessThan30Characters(value);
    }
    ensureLengthIsLessThan30Characters(value) {
        if (value.length > 30) {
            throw new InvalidArgumentError_1.InvalidArgumentError(`The User First Name <${value}> has more than 30 characters`);
        }
    }
}
exports.UserActiveDate = UserActiveDate;
//# sourceMappingURL=UserActiveDate.js.map