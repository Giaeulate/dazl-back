"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPhoto = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const UserId_1 = require("../../users/domain/UserId");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const FileId_1 = require("../../file/domain/FileId");
const UserPhotoId_1 = require("./UserPhotoId");
const UserPhotoActive_1 = require("./UserPhotoActive");
class UserPhoto extends AggregateRoot_1.AggregateRoot {
    constructor(id, userId, photo, active, createdAt, updatedAt) {
        super();
        this.id = id;
        this.userId = userId;
        this.photo = photo;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(plainData) {
        const userPhotoFromPrimitives = this.fromPrimitives(Object.assign(Object.assign({}, plainData), { active: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
        const userPhoto = new UserPhoto(userPhotoFromPrimitives.id, userPhotoFromPrimitives.userId, userPhotoFromPrimitives.photo, userPhotoFromPrimitives.active, userPhotoFromPrimitives.createdAt, userPhotoFromPrimitives.updatedAt);
        return userPhoto;
    }
    static fromPrimitives(plainData) {
        return new UserPhoto(new UserPhotoId_1.UserPhotoId(plainData.id), new UserId_1.UserId(plainData.userId), new FileId_1.FileId(plainData.photo), new UserPhotoActive_1.UserPhotoActive(plainData.active), new CreatedAt_1.CreatedAt(plainData.createdAt), new UpdatedAt_1.UpdatedAt(plainData.updatedAt));
    }
    toPrimitives() {
        return {
            id: this.id.value,
            userId: this.userId.value,
            photo: this.photo.value,
            active: this.active.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}
exports.UserPhoto = UserPhoto;
//# sourceMappingURL=UserPhoto.js.map