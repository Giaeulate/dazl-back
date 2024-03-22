import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserId } from '../../users/domain/UserId';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { FileId } from '../../file/domain/FileId';
import { UserPhotoId } from './UserPhotoId';
import { UserPhotoActive } from './UserPhotoActive';
export declare class UserPhoto extends AggregateRoot {
    id: UserPhotoId;
    userId: UserId;
    photo: FileId;
    active: UserPhotoActive;
    createdAt: CreatedAt;
    updatedAt: UpdatedAt;
    constructor(id: UserPhotoId, userId: UserId, photo: FileId, active: UserPhotoActive, createdAt: CreatedAt, updatedAt: UpdatedAt);
    static create(plainData: {
        id: string;
        userId: string;
        photo: string;
    }): UserPhoto;
    static fromPrimitives(plainData: {
        id: string;
        userId: string;
        photo: string;
        active: boolean;
        createdAt: string;
        updatedAt: string;
    }): UserPhoto;
    toPrimitives(): any;
}
