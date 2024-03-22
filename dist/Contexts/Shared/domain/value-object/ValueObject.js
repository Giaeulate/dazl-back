"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
class ValueObject {
    constructor(value) {
        this.value = value;
    }
    equals(other) {
        return (other.constructor.name == this.constructor.name &&
            other.value == this.value);
    }
    toString() {
        return this.value.toString();
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=ValueObject.js.map