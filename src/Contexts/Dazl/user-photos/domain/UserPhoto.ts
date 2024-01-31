import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserId } from '../../users/domain/UserId';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { FileId } from '../../file/domain/FileId';
import { UserPhotoId } from './UserPhotoId';
import { UserPhotoActive } from './UserPhotoActive';

export class UserPhoto extends AggregateRoot {
  id: UserPhotoId;
  userId: UserId;
  photo: FileId;
  active: UserPhotoActive;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;

  constructor(
    id: UserPhotoId,
    userId: UserId,
    photo: FileId,
    active: UserPhotoActive,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.photo = photo;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(plainData: {
    id: string;
    userId: string;
    photo: string;
  }): UserPhoto {
    const userPhotoFromPrimitives = this.fromPrimitives({
      ...plainData,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    const userPhoto = new UserPhoto(
      userPhotoFromPrimitives.id,
      userPhotoFromPrimitives.userId,
      userPhotoFromPrimitives.photo,
      userPhotoFromPrimitives.active,
      userPhotoFromPrimitives.createdAt,
      userPhotoFromPrimitives.updatedAt,
    );
    return userPhoto;
  }

  static fromPrimitives(plainData: {
    id: string;
    userId: string;
    photo: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  }): UserPhoto {
    return new UserPhoto(
      new UserPhotoId(plainData.id),
      new UserId(plainData.userId),
      new FileId(plainData.photo),
      new UserPhotoActive(plainData.active),
      new CreatedAt(plainData.createdAt),
      new UpdatedAt(plainData.updatedAt),
    );
  }

  toPrimitives(): any {
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
