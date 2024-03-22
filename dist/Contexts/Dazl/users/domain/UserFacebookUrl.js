"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFacebookUrl = void 0;
const common_1 = require("@nestjs/common");
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
class UserFacebookUrl extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
    }
    ensureIsValidUrl(value) {
        const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9\-]+(?:\.[a-z0-9\-]+)+\S*$/i;
        if (!urlRegex.test(value)) {
            throw new common_1.BadRequestException(`The value <${value}> is not a valid URL.`);
        }
    }
}
exports.UserFacebookUrl = UserFacebookUrl;
//# sourceMappingURL=UserFacebookUrl.js.map