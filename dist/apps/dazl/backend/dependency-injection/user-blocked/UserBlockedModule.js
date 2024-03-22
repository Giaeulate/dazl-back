"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlockedModule = void 0;
const common_1 = require("@nestjs/common");
const UserBlockedUnblocker_1 = require("../../../../../Contexts/Dazl/user-blocked/application/unblock/UserBlockedUnblocker");
const UserBlockedActiveSearcher_1 = require("../../../../../Contexts/Dazl/user-blocked/application/search-active/UserBlockedActiveSearcher");
const UserBlockedBlocker_1 = require("../../../../../Contexts/Dazl/user-blocked/application/block/UserBlockedBlocker");
const UserBlockedByUserSearcher_1 = require("../../../../../Contexts/Dazl/user-blocked/application/search-by-user/UserBlockedByUserSearcher");
const UserBlockedAllActiveSearcher_1 = require("../../../../../Contexts/Dazl/user-blocked/application/search-all-active/UserBlockedAllActiveSearcher");
const UserBlockedAllSearcher_1 = require("../../../../../Contexts/Dazl/user-blocked/application/search-all/UserBlockedAllSearcher");
const PostUserBlockedController_1 = require("../../controllers/PostUserBlockedController");
const GetUserBlockedController_1 = require("../../controllers/GetUserBlockedController");
const PutUserBlockedController_1 = require("../../controllers/PutUserBlockedController");
let UserBlockedModule = class UserBlockedModule {
};
UserBlockedModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            PostUserBlockedController_1.PostUserBlockedController,
            GetUserBlockedController_1.GetUserBlockedController,
            PutUserBlockedController_1.PutUserBlockedController,
        ],
        providers: [
            UserBlockedUnblocker_1.UserBlockedUnblocker,
            UserBlockedActiveSearcher_1.UserBlockedActiveSearcher,
            UserBlockedBlocker_1.UserBlockedBlocker,
            UserBlockedByUserSearcher_1.UserBlockedByUserSearcher,
            UserBlockedAllActiveSearcher_1.UserBlockedAllActiveSearcher,
            UserBlockedAllSearcher_1.UserBlockedAllSearcher,
        ],
        exports: [],
    })
], UserBlockedModule);
exports.UserBlockedModule = UserBlockedModule;
//# sourceMappingURL=UserBlockedModule.js.map