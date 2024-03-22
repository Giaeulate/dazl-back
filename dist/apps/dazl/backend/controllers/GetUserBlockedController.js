"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserBlockedController = void 0;
const common_1 = require("@nestjs/common");
const UserBlockedByUserSearcher_1 = require("../../../../Contexts/Dazl/user-blocked/application/search-by-user/UserBlockedByUserSearcher");
class QueryController {
}
let GetUserBlockedController = class GetUserBlockedController {
    constructor(blockedByUserSearcher) {
        this.blockedByUserSearcher = blockedByUserSearcher;
    }
    async run(body) {
        const { user_id } = body;
        const userBlockeds = await this.blockedByUserSearcher.run({
            userId: user_id,
        });
        return {
            status: true,
            message: 'Items encontrados exitosamente',
            items: userBlockeds,
        };
    }
};
__decorate([
    (0, common_1.Get)('by-user'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryController]),
    __metadata("design:returntype", Promise)
], GetUserBlockedController.prototype, "run", null);
GetUserBlockedController = __decorate([
    (0, common_1.Controller)('v1/user-blocked'),
    __metadata("design:paramtypes", [UserBlockedByUserSearcher_1.UserBlockedByUserSearcher])
], GetUserBlockedController);
exports.GetUserBlockedController = GetUserBlockedController;
//# sourceMappingURL=GetUserBlockedController.js.map