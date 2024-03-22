"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObjectTransformer = void 0;
const ValueObjectTransformer = (ValueObject) => {
    return {
        to: (value) => value === null || value === void 0 ? void 0 : value.value,
        from: (value) => new ValueObject(value),
    };
};
exports.ValueObjectTransformer = ValueObjectTransformer;
//# sourceMappingURL=ValueObjectTransformer.js.map