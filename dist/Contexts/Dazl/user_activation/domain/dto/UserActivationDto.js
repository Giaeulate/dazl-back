"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationDto = void 0;
class UserActivationDto {
    static create(userActivation) {
        const userActivationDto = new UserActivationDto();
        userActivationDto.id = userActivation.id.value;
        userActivationDto.details = userActivation.details.value;
        userActivationDto.timeAdded = userActivation.timeAdded.value;
        userActivationDto.active = userActivation.active.value;
        userActivationDto.name = userActivation.name.value;
        userActivationDto.male = userActivation.male.value;
        userActivationDto.female = userActivation.female.value;
        userActivationDto.isActiveSocket = userActivation.isActiveSocket.value;
        userActivationDto.activeDate = userActivation.activeDate.value;
        userActivationDto.expirationDate = userActivation.expirationDate.value;
        userActivationDto.currentLives = userActivation.currentLives.value;
        userActivationDto.longitude = userActivation.longitude.value;
        userActivationDto.latitude = userActivation.latitude.value;
        userActivationDto.socketId = userActivation.socketId.value;
        userActivationDto.createdAt = userActivation.createdAt.value;
        userActivationDto.updatedAt = userActivation.updatedAt.value;
        return userActivationDto;
    }
}
exports.UserActivationDto = UserActivationDto;
//# sourceMappingURL=UserActivationDto.js.map