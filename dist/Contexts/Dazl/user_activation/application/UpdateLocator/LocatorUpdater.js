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
exports.LocatorUpdater = void 0;
const common_1 = require("@nestjs/common");
const UserActivationFinder_1 = require("../finder/UserActivationFinder");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let LocatorUpdater = class LocatorUpdater {
    constructor(repository, eventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.activationFinder = new UserActivationFinder_1.UserActivationFinder(repository);
    }
    async run(params) {
        const { id, locator } = params;
        const userActivation = await this.activationFinder.run(id);
        console.log('LocatorUpdater', userActivation.toPrimitives());
        userActivation.updateLocator(locator);
        console.log(userActivation.toPrimitives());
        await this.repository.save(userActivation);
        await this.eventBus.publish(userActivation.pullDomainEvents());
    }
};
LocatorUpdater = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [Object, Object])
], LocatorUpdater);
exports.LocatorUpdater = LocatorUpdater;
//# sourceMappingURL=LocatorUpdater.js.map