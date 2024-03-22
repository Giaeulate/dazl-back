"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
let SharedRepositoryModule = class SharedRepositoryModule {
};
SharedRepositoryModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        providers: [
            constants_1.USER_ACTIVATION_REPOSITORY_OBJECT,
            constants_1.EVENT_BUS_OBJECT,
            constants_1.USER_REPOSITORY_OBJECT,
            constants_1.FILE_REPOSITORY_OBJECT,
            constants_1.INVITATION_REPOSITORY_OBJECT,
            constants_1.CHANNEL_REPOSITORY_OBJECT,
            constants_1.AUTH_REPOSITORY_OBJECT,
            constants_1.MESSAGE_REPOSITORY_OBJECT,
            constants_1.CHANNEL_USER_REPOSITORY_OBJECT,
            constants_1.MESSAGE_FILE_REPOSITORY_OBJECT,
            constants_1.EVENT_BUS_OBJECT,
            constants_1.USER_ACTIVE_HISTORY_REPOSITORY_OBJECT,
            constants_1.COMPLAINT_REPOSITORY_OBJECT,
            constants_1.USER_PHOTO_REPOSITORY_OBJECT,
            constants_1.EVENT_REPOSITORY_OBJECT,
            constants_1.CITY_REPOSITORY_OBJECT,
            constants_1.USER_REPORT_OBJECT,
            constants_1.COUNTRY_REPOSITORY_OBJECT,
            constants_1.FORBIDDEN_WORD_REPOSITORY_OBJECT,
            constants_1.EVENT_CATEGORY_REPOSITORY_OBJECT,
            constants_1.USER_BLOCKED_REPOSITORY_OBJECT,
            constants_1.USER_LIVE_REPOSITORY_OBJECT,
        ],
        exports: [
            constants_1.USER_ACTIVATION_REPOSITORY_OBJECT,
            constants_1.EVENT_BUS_OBJECT,
            constants_1.USER_REPOSITORY_OBJECT,
            constants_1.FILE_REPOSITORY_OBJECT,
            constants_1.INVITATION_REPOSITORY_OBJECT,
            constants_1.CHANNEL_REPOSITORY_OBJECT,
            constants_1.AUTH_REPOSITORY_OBJECT,
            constants_1.MESSAGE_FILE_REPOSITORY_OBJECT,
            constants_1.MESSAGE_REPOSITORY_OBJECT,
            constants_1.CHANNEL_USER_REPOSITORY_OBJECT,
            constants_1.EVENT_BUS_OBJECT,
            constants_1.USER_ACTIVE_HISTORY_REPOSITORY_OBJECT,
            constants_1.COMPLAINT_REPOSITORY_OBJECT,
            constants_1.USER_PHOTO_REPOSITORY_OBJECT,
            constants_1.EVENT_REPOSITORY_OBJECT,
            constants_1.CITY_REPOSITORY_OBJECT,
            constants_1.USER_REPORT_OBJECT,
            constants_1.COUNTRY_REPOSITORY_OBJECT,
            constants_1.FORBIDDEN_WORD_REPOSITORY_OBJECT,
            constants_1.EVENT_CATEGORY_REPOSITORY_OBJECT,
            constants_1.USER_BLOCKED_REPOSITORY_OBJECT,
            constants_1.USER_LIVE_REPOSITORY_OBJECT,
        ],
    })
], SharedRepositoryModule);
exports.SharedRepositoryModule = SharedRepositoryModule;
//# sourceMappingURL=shared-repository.module.js.map