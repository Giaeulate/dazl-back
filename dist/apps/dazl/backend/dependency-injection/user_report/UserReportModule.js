"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReportModule = void 0;
const common_1 = require("@nestjs/common");
const PutUsersReportController_1 = require("../../controllers/PutUsersReportController");
const UserReportCreator_1 = require("../../../../../Contexts/Dazl/UserReports/application/create/UserReportCreator");
let UserReportModule = class UserReportModule {
};
UserReportModule = __decorate([
    (0, common_1.Module)({
        providers: [UserReportCreator_1.UserReportCreator],
        controllers: [PutUsersReportController_1.PutUsersReportController],
    })
], UserReportModule);
exports.UserReportModule = UserReportModule;
//# sourceMappingURL=UserReportModule.js.map