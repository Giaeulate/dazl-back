"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationEntityDto = exports.UsersActiveUserDto = exports.UsersActiveFileUserInvitationDto = exports.UsersActiveFileUserDto = exports.UsersActiveFileDto = void 0;
const UserActivationDto_1 = require("./UserActivationDto");
const FileDto_1 = require("../../../file/domain/dto/FileDto");
const UserDto_1 = require("../../../users/domain/dto/UserDto");
class UsersActiveFileDto extends UserActivationDto_1.UserActivationDto {
    constructor(userActivation, file) {
        super();
        this.file = new FileDto_1.FileDto(file);
        this.id = userActivation.id;
        this.details = userActivation.details;
        this.timeAdded = userActivation.timeAdded;
        this.active = userActivation.active;
        this.name = userActivation.name;
        this.male = userActivation.male;
        this.female - userActivation.female;
        this.activeDate = userActivation.activeDate;
        this.expirationDate = userActivation.expirationDate;
        this.longitude = userActivation.longitude;
        this.latitude = userActivation.latitude;
        this.socketId = userActivation.socketId;
        this.createdAt = userActivation.createdAt;
        this.updatedAt = userActivation.updatedAt;
    }
}
exports.UsersActiveFileDto = UsersActiveFileDto;
class UsersActiveFileUserDto extends UserActivationDto_1.UserActivationDto {
    constructor(userActivation, file, user) {
        super();
        this.file = new FileDto_1.FileDto(file);
        this.user = new UserDto_1.UserDto(user);
        this.id = userActivation.id;
        this.details = userActivation.details;
        this.timeAdded = userActivation.timeAdded;
        this.active =
            userActivation.active === 1 && userActivation.isActiveSocket === 1
                ? 1
                : 0;
        this.name = userActivation.name;
        this.male = userActivation.male;
        this.female - userActivation.female;
        this.activeDate = userActivation.activeDate;
        this.currentLives = userActivation.currentLives;
        this.expirationDate = userActivation.expirationDate;
        this.longitude = userActivation.longitude;
        this.latitude = userActivation.latitude;
        this.socketId = userActivation.socketId;
        this.createdAt = userActivation.createdAt;
        this.updatedAt = userActivation.updatedAt;
    }
}
exports.UsersActiveFileUserDto = UsersActiveFileUserDto;
class UsersActiveFileUserInvitationDto extends UsersActiveFileUserDto {
    constructor(userActivation, file, user, invitation) {
        super(userActivation, file, user);
        this.invitation = invitation;
    }
}
exports.UsersActiveFileUserInvitationDto = UsersActiveFileUserInvitationDto;
class UsersActiveUserDto extends UserActivationDto_1.UserActivationDto {
    constructor(userActivation, user) {
        super();
        this.user = new UserDto_1.UserDto(user);
        this.id = userActivation.id;
        this.details = userActivation.details;
        this.timeAdded = userActivation.timeAdded;
        this.active = userActivation.active;
        this.name = userActivation.name;
        this.male = userActivation.male;
        this.female - userActivation.female;
        this.currentLives = userActivation.currentLives;
        this.activeDate = userActivation.activeDate;
        this.expirationDate = userActivation.expirationDate;
        this.longitude = userActivation.longitude;
        this.latitude = userActivation.latitude;
        this.socketId = userActivation.socketId;
        this.createdAt = userActivation.createdAt;
        this.updatedAt = userActivation.updatedAt;
    }
}
exports.UsersActiveUserDto = UsersActiveUserDto;
class UserActivationEntityDto extends UserActivationDto_1.UserActivationDto {
    constructor(userId, id, details, fileImageId, timeAdded, active, name, male, female, activeDate, expirationDate, isActiveSocket, currentLives, longitude, latitude, socketId, createdAt, updatedAt) {
        super();
        this.userId = userId;
        this.fileImageId = fileImageId;
        this.id = id;
        this.details = details;
        this.timeAdded = timeAdded;
        this.active = active;
        this.name = name;
        this.male = male;
        this.isActiveSocket = isActiveSocket;
        this.female = female;
        this.activeDate = activeDate;
        this.expirationDate = expirationDate;
        this.currentLives = currentLives;
        this.longitude = longitude;
        this.latitude = latitude;
        this.socketId = socketId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    convertToDto() {
        const userActivationDto = new UserActivationDto_1.UserActivationDto();
        userActivationDto.id = this.id;
        userActivationDto.details = this.details;
        userActivationDto.timeAdded = this.timeAdded;
        userActivationDto.active = this.active;
        userActivationDto.name = this.name;
        userActivationDto.male = this.male;
        userActivationDto.female - this.female;
        userActivationDto.activeDate = this.activeDate;
        userActivationDto.expirationDate = this.expirationDate;
        userActivationDto.currentLives = this.currentLives;
        userActivationDto.longitude = this.longitude;
        userActivationDto.latitude = this.latitude;
        userActivationDto.isActiveSocket = this.isActiveSocket;
        userActivationDto.socketId = this.socketId;
        userActivationDto.createdAt = this.createdAt;
        userActivationDto.updatedAt = this.updatedAt;
        return userActivationDto;
    }
}
exports.UserActivationEntityDto = UserActivationEntityDto;
//# sourceMappingURL=indexDto.js.map