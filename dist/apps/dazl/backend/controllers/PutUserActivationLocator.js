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
exports.PutUserActivationLocator = void 0;
const common_1 = require("@nestjs/common");
const LocatorUpdater_1 = require("../../../../Contexts/Dazl/user_activation/application/UpdateLocator/LocatorUpdater");
const UserActivationId_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationId");
const UserActivationIsTheLocatorActivated_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationIsTheLocatorActivated");
class Params {
}
class QueryParams {
}
let PutUserActivationLocator = class PutUserActivationLocator {
    constructor(updater) {
        this.updater = updater;
    }
    async run(params, queryParams) {
        const { id } = params;
        const { active } = queryParams;
        console.log('id', id);
        console.log('active', active);
        await this.updater.run({
            id: new UserActivationId_1.UserActivationId(id),
            locator: new UserActivationIsTheLocatorActivated_1.UserActivationIsTheLocatorActivated(active),
        });
        return {
            status: true,
            message: 'Locator updated successfully',
            item: {},
        };
    }
};
__decorate([
    (0, common_1.Put)(':id/locator'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Params,
        QueryParams]),
    __metadata("design:returntype", Promise)
], PutUserActivationLocator.prototype, "run", null);
PutUserActivationLocator = __decorate([
    (0, common_1.Controller)('user-activation'),
    __metadata("design:paramtypes", [LocatorUpdater_1.LocatorUpdater])
], PutUserActivationLocator);
exports.PutUserActivationLocator = PutUserActivationLocator;
//# sourceMappingURL=PutUserActivationLocator.js.map