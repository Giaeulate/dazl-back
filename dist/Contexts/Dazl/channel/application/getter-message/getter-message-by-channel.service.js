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
exports.GetterMessageByChannelService = void 0;
const common_1 = require("@nestjs/common");
const getter_cron_service_1 = require("../getter-cron/getter-cron.service");
const finder_channel_service_1 = require("../finder/finder-channel.service");
const finder_all_message_service_1 = require("../../../message/application/finder-all/finder-all-message.service");
const finder_by_message_service_1 = require("../../../message-file/application/finder-by-message/finder-by-message.service");
const ConvertMessageResponse_1 = require("../../../message/application/ConvertResponse/ConvertMessageResponse");
let GetterMessageByChannelService = class GetterMessageByChannelService {
    constructor(finderChannelService, getterCronService, finderAllMessageService, finderByMessageService, convertMessageResponse) {
        this.finderChannelService = finderChannelService;
        this.getterCronService = getterCronService;
        this.finderAllMessageService = finderAllMessageService;
        this.finderByMessageService = finderByMessageService;
        this.convertMessageResponse = convertMessageResponse;
    }
    async run(channelId) {
        const channel = await this.finderChannelService.run(channelId);
        const messages = await this.finderAllMessageService.run(channel.id);
        const messagesFile = await Promise.all(messages.map(async (message) => {
            const messageFile = await this.finderByMessageService.run(message.id.value);
            return await this.convertMessageResponse.run({
                message,
                messageFile,
            });
        }));
        const timeLeft = this.getterCronService.run(channel);
        return {
            messages: messagesFile,
            timeLeft,
            second_chance_sent: channel.secondChance.value !== "neutral",
        };
    }
};
GetterMessageByChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [finder_channel_service_1.FinderChannelService,
        getter_cron_service_1.GetterCronService,
        finder_all_message_service_1.FinderAllMessageService,
        finder_by_message_service_1.FinderByMessageService,
        ConvertMessageResponse_1.ConvertMessageResponse])
], GetterMessageByChannelService);
exports.GetterMessageByChannelService = GetterMessageByChannelService;
//# sourceMappingURL=getter-message-by-channel.service.js.map