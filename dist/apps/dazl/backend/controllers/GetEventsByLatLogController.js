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
exports.GetEventsByLatLogController = void 0;
const common_1 = require("@nestjs/common");
const EventsActiveByLatLogGetter_1 = require("../../../../Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter");
const EventLatitude_1 = require("../../../../Contexts/Dazl/Events/domain/EventLatitude");
const EventLongitude_1 = require("../../../../Contexts/Dazl/Events/domain/EventLongitude");
class GetEventsByLatLogQuery {
}
let GetEventsByLatLogController = class GetEventsByLatLogController {
    constructor(eventsActiveByLatLogGetter) {
        this.eventsActiveByLatLogGetter = eventsActiveByLatLogGetter;
    }
    async run(query) {
        const { lat, lng, distance } = query;
        const response = await this.eventsActiveByLatLogGetter.run({
            lat: new EventLatitude_1.EventLatitude(lat),
            log: new EventLongitude_1.EventLongitude(lng),
            distance: distance ? distance : 500,
        });
        return {
            status: true,
            message: 'success',
            item: response,
        };
    }
};
__decorate([
    (0, common_1.Get)('lat-lng'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetEventsByLatLogQuery]),
    __metadata("design:returntype", Promise)
], GetEventsByLatLogController.prototype, "run", null);
GetEventsByLatLogController = __decorate([
    (0, common_1.Controller)('v1/events'),
    __metadata("design:paramtypes", [EventsActiveByLatLogGetter_1.EventsActiveByLatLogGetter])
], GetEventsByLatLogController);
exports.GetEventsByLatLogController = GetEventsByLatLogController;
//# sourceMappingURL=GetEventsByLatLogController.js.map