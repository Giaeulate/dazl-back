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
exports.GetUserActiveLatLogController = void 0;
const common_1 = require("@nestjs/common");
const UserActivationLatLogGetter_1 = require("../../../../Contexts/Dazl/user_activation/application/GetLatLog/UserActivationLatLogGetter");
const UserActivationLatitude_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationLatitude");
const UserActivationLongitude_1 = require("../../../../Contexts/Dazl/user_activation/domain/UserActivationLongitude");
const EventsActiveByLatLogGetter_1 = require("../../../../Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter");
const EventLatitude_1 = require("../../../../Contexts/Dazl/Events/domain/EventLatitude");
class GetUserActiveLatLogQuery {
}
let GetUserActiveLatLogController = class GetUserActiveLatLogController {
    constructor(activationLatLogGetter, eventsActiveByLatLogGetter) {
        this.activationLatLogGetter = activationLatLogGetter;
        this.eventsActiveByLatLogGetter = eventsActiveByLatLogGetter;
    }
    async run(queries) {
        console.log('GetUserActiveLatLogController', queries);
        const lat = queries.lat;
        const log = queries.log;
        const distance = queries.distance;
        const eventsData = await this.eventsActiveByLatLogGetter.run({
            lat: new EventLatitude_1.EventLatitude(lat.toString()),
            log: new EventLatitude_1.EventLatitude(log.toString()),
            distance: distance,
        });
        const response = await this.activationLatLogGetter.run({
            latitude: new UserActivationLatitude_1.UserActivationLatitude(String(lat)),
            longitude: new UserActivationLongitude_1.UserActivationLongitude(String(log)),
            distance: Number(distance),
            male: queries.male === '1' ? 1 : queries.male === '0' ? 0 : null,
            female: queries.female === '1' ? 1 : queries.female === '0' ? 0 : null,
            lgtb: queries.lgtb === '1' ? 1 : queries.lgtb === '0' ? 0 : null,
            ageUpperFilter: queries.upper_age ? queries.upper_age : 0,
            ageLowerFilter: queries.lower_age ? queries.lower_age : 0,
            date_upper: queries.date_upper ? queries.date_upper : null,
            date_lower: queries.date_lower ? queries.date_lower : null,
        });
        console.log('123');
        return {
            status: true,
            message: 'User active',
            items: response,
            events: eventsData,
        };
    }
};
__decorate([
    (0, common_1.Get)('maps'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetUserActiveLatLogQuery]),
    __metadata("design:returntype", Promise)
], GetUserActiveLatLogController.prototype, "run", null);
GetUserActiveLatLogController = __decorate([
    (0, common_1.Controller)('v1/user-activation'),
    __metadata("design:paramtypes", [UserActivationLatLogGetter_1.UserActivationLatLogGetter,
        EventsActiveByLatLogGetter_1.EventsActiveByLatLogGetter])
], GetUserActiveLatLogController);
exports.GetUserActiveLatLogController = GetUserActiveLatLogController;
//# sourceMappingURL=GetUserActiveLatLogController.js.map