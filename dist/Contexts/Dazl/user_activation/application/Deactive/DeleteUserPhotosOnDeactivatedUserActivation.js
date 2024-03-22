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
exports.DeleteUserPhotosOnDeactivatedUserActivation = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const UserActivationDeactivatedDomainEvent_1 = require("../../domain/UserActivationDeactivatedDomainEvent");
const FinderUserPhotosAll_1 = require("../../../user-photos/application/FinderAll/FinderUserPhotosAll");
const UserId_1 = require("../../../users/domain/UserId");
const DeleteUserPhoto_1 = require("../../../user-photos/application/DeletePhoto/DeleteUserPhoto");
const FinderUser_1 = require("../../../users/application/Finder/FinderUser");
let DeleteUserPhotosOnDeactivatedUserActivation = class DeleteUserPhotosOnDeactivatedUserActivation {
    constructor(finderUser, finderUserPhotosAll, deleteUserPhoto) {
        this.finderUser = finderUser;
        this.finderUserPhotosAll = finderUserPhotosAll;
        this.deleteUserPhoto = deleteUserPhoto;
    }
    async on(event) {
        try {
            const user = await this.finderUser.run(new UserId_1.UserId(event.userId));
            if (user) {
                const userPhotos = await this.finderUserPhotosAll.run();
                const photosByUser = userPhotos.filter(({ userId }) => userId.equals(user.id));
                for (const userPhoto of photosByUser) {
                    await this.deleteUserPhoto.run(userPhoto.photo);
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(UserActivationDeactivatedDomainEvent_1.UserActivationDeactivatedDomainEvent.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserActivationDeactivatedDomainEvent_1.UserActivationDeactivatedDomainEvent]),
    __metadata("design:returntype", Promise)
], DeleteUserPhotosOnDeactivatedUserActivation.prototype, "on", null);
DeleteUserPhotosOnDeactivatedUserActivation = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [FinderUser_1.FinderUser,
        FinderUserPhotosAll_1.FinderUserPhotosAll,
        DeleteUserPhoto_1.DeleteUserPhoto])
], DeleteUserPhotosOnDeactivatedUserActivation);
exports.DeleteUserPhotosOnDeactivatedUserActivation = DeleteUserPhotosOnDeactivatedUserActivation;
//# sourceMappingURL=DeleteUserPhotosOnDeactivatedUserActivation.js.map