"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationDetails = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
const common_1 = require("@nestjs/common");
class UserActivationDetails extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
        this.value = value;
    }
    static checkForbiddenTerms(forbiddenTerms, value) {
        for (const term of forbiddenTerms) {
            if (value.toLowerCase().includes(term.toLowerCase())) {
                throw new common_1.BadRequestException(`El texto proporcionada no puede contener un término prohibido: "${term}"`);
            }
        }
        return new UserActivationDetails(value);
    }
}
exports.UserActivationDetails = UserActivationDetails;
//# sourceMappingURL=UserActivationDetails.js.map