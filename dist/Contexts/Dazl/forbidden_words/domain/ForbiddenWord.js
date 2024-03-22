"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenWord = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
class ForbiddenWord extends AggregateRoot_1.AggregateRoot {
    constructor() {
        super();
    }
    toPrimitives() {
        return {
            id: this.id.value,
            text: this.text.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}
exports.ForbiddenWord = ForbiddenWord;
//# sourceMappingURL=ForbiddenWord.js.map