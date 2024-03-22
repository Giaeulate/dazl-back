"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessfulFormatResponse = void 0;
const FormatResponse_1 = require("./FormatResponse");
class SuccessfulFormatResponse extends FormatResponse_1.FormatResponse {
    constructor(items, statusCode = 200) {
        super(true, 'Good Request', statusCode);
        this.items = items;
    }
}
exports.SuccessfulFormatResponse = SuccessfulFormatResponse;
//# sourceMappingURL=SuccessfulFormatResponse.js.map