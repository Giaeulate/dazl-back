"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWhatsappUrl = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
const common_1 = require("@nestjs/common");
class UserWhatsappUrl extends StringValueObject_1.StringValueObject {
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
exports.UserWhatsappUrl = UserWhatsappUrl;
//# sourceMappingURL=UserWhatsappUrl.js.map