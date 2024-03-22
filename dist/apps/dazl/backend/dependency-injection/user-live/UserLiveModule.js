"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLiveModule = void 0;
const common_1 = require("@nestjs/common");
const UserLiveByUserCreator_1 = require("../../../../../Contexts/Dazl/user-live/application/create-by-user/UserLiveByUserCreator");
const UserLiveCreator_1 = require("../../../../../Contexts/Dazl/user-live/application/create/UserLiveCreator");
const UserLiveAllByUserSearcher_1 = require("../../../../../Contexts/Dazl/user-live/application/search-all-by-user/UserLiveAllByUserSearcher");
const UserLiveActive_1 = require("../../../../../Contexts/Dazl/user-live/application/active/UserLiveActive");
const UserLiveDesactive_1 = require("../../../../../Contexts/Dazl/user-live/application/desactive/UserLiveDesactive");
const UserLiveChangeStatusOnStatusInactived_1 = require("../../../../../Contexts/Dazl/user-live/application/change-status-holding/UserLiveChangeStatusOnStatusInactived");
const UserLiveStatusHoldingChanger_1 = require("../../../../../Contexts/Dazl/user-live/application/change-status-holding/UserLiveStatusHoldingChanger");
let UserLiveModule = class UserLiveModule {
};
UserLiveModule = __decorate([
    (0, common_1.Module)({
        providers: [
            UserLiveByUserCreator_1.UserLiveByUserCreator,
            UserLiveCreator_1.UserLiveCreator,
            UserLiveAllByUserSearcher_1.UserLiveAllByUserSearcher,
            UserLiveActive_1.UserLiveActive,
            UserLiveDesactive_1.UserLiveDesactive,
            UserLiveChangeStatusOnStatusInactived_1.UserLiveChangeStatusOnStatusInactived,
            UserLiveStatusHoldingChanger_1.UserLiveStatusHoldingChanger,
        ],
    })
], UserLiveModule);
exports.UserLiveModule = UserLiveModule;
//# sourceMappingURL=UserLiveModule.js.map