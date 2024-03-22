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
var Tasks_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const ensurement_desactive_user_activation_1 = require("../ensurement-desactive/ensurement-desactive-user-activation");
const EnsurementDesactiveChat_1 = require("../../../Dazl/channel/application/EnsurementDesactiveChat/EnsurementDesactiveChat");
const RestartUserActivationLives_1 = require("../../../Dazl/user_activation/application/RestartLives/RestartUserActivationLives");
const UserLiveActiveExpirated_1 = require("../../../Dazl/user-live/application/active-expirated/UserLiveActiveExpirated");
let Tasks = Tasks_1 = class Tasks {
    constructor(ensurementDesactiveUserActivation, ensurementDesactiveChat, userActivationLives, activeExpirated) {
        this.ensurementDesactiveUserActivation = ensurementDesactiveUserActivation;
        this.ensurementDesactiveChat = ensurementDesactiveChat;
        this.userActivationLives = userActivationLives;
        this.activeExpirated = activeExpirated;
        this.logger = new common_1.Logger(Tasks_1.name);
    }
    async handleCronEnsureActivationUser() {
        this.logger.debug('CronExpression.EVERY_30_MINUTES');
        await this.ensurementDesactiveUserActivation.run();
    }
    async handleCronEnsureActivationChat() {
        this.logger.debug('CronExpression.EVERY_MINUTE');
        await this.ensurementDesactiveChat.run();
        await this.userActivationLives.run();
        await this.activeExpirated.run();
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Tasks.prototype, "handleCronEnsureActivationUser", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Tasks.prototype, "handleCronEnsureActivationChat", null);
Tasks = Tasks_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ensurement_desactive_user_activation_1.EnsurementDesactiveUserActivation,
        EnsurementDesactiveChat_1.EnsurementDesactiveChat,
        RestartUserActivationLives_1.RestartUserActivationLives,
        UserLiveActiveExpirated_1.UserLiveActiveExpirated])
], Tasks);
exports.Tasks = Tasks;
//# sourceMappingURL=Tasks.js.map