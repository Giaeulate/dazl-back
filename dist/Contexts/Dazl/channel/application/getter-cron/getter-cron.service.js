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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetterCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const ChannelSecondChance_1 = require("../../domain/ChannelSecondChance");
const TimeActivation_1 = require("../../../../../apps/dazl/backend/config/TimeActivation");
let GetterCronService = class GetterCronService {
    constructor(schedulerRegistry) {
        this.schedulerRegistry = schedulerRegistry;
        this.millisecondsToMinutesYSeconds = (milliseconds) => {
            const minutes = parseInt(String(milliseconds / 1000 / 60));
            milliseconds -= minutes * 60 * 1000;
            const seconds = milliseconds / 1000;
            return {
                minutes,
                seconds,
            };
        };
    }
    run(channel) {
        const { id, startTime, secondChance } = channel;
        try {
            this.schedulerRegistry.getTimeout(id.value);
        }
        catch (error) {
            const timeoutNew = setTimeout(() => { }, TimeActivation_1.ChatsTime.CHAT_REMEMBER_TIME);
            this.schedulerRegistry.addTimeout(id.value, timeoutNew);
        }
        let timeLeft;
        if (secondChance.equals(new ChannelSecondChance_1.ChannelSecondChance("accept"))) {
            timeLeft =
                TimeActivation_1.ChatsTime.CHAT_REMEMBER_TIME -
                    (new Date().getTime() - Number(startTime.value));
            return this.millisecondsToMinutesYSeconds(timeLeft);
        }
        else {
            timeLeft =
                TimeActivation_1.ChatsTime.CHAT_TIME - (new Date().getTime() - Number(startTime.value));
            return this.millisecondsToMinutesYSeconds(timeLeft);
        }
    }
};
GetterCronService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry])
], GetterCronService);
exports.GetterCronService = GetterCronService;
//# sourceMappingURL=getter-cron.service.js.map