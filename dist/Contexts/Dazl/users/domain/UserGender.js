"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGenderEnum = exports.UserGender = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
const InvalidArgumentError_1 = require("../../../Shared/domain/value-object/InvalidArgumentError");
class UserGender extends StringValueObject_1.StringValueObject {
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
exports.UserGender = UserGender;
var UserGenderEnum;
(function (UserGenderEnum) {
    UserGenderEnum["MALE"] = "male";
    UserGenderEnum["FEMALE"] = "female";
})(UserGenderEnum = exports.UserGenderEnum || (exports.UserGenderEnum = {}));
//# sourceMappingURL=UserGender.js.map