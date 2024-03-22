"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActiveValidationModule = void 0;
const common_1 = require("@nestjs/common");
const user_active_validation_post_controller_1 = require("../../controllers/user-active-validation-post.controller");
const ValidateUserActivation_1 = require("../../../../../Contexts/Dazl/user_activation/application/validate/ValidateUserActivation");
let UserActiveValidationModule = class UserActiveValidationModule {
};
UserActiveValidationModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [ValidateUserActivation_1.ValidateUserActivation],
        controllers: [user_active_validation_post_controller_1.UserActiveValidationPostController],
    })
], UserActiveValidationModule);
exports.UserActiveValidationModule = UserActiveValidationModule;
//# sourceMappingURL=user-active-validation.module.js.map