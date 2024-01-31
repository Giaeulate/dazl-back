import { UserActivationDto } from './UserActivationDto';
import { User } from '../../../users/domain/User';
import { FileDto } from '../../../file/domain/dto/FileDto';
import { File } from '../../../file/domain/File';
import { UserDto } from '../../../users/domain/dto/UserDto';

export class UsersActiveFileDto extends UserActivationDto {
  file: FileDto;

  constructor(userActivation: UserActivationDto, file: File) {
    super();
    this.file = new FileDto(file);

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

export class UsersActiveFileUserDto extends UserActivationDto {
  file: FileDto;
  user: UserDto;

  constructor(userActivation: UserActivationDto, file: File, user: User) {
    super();
    this.file = new FileDto(file);
    this.user = new UserDto(user);

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

export class UsersActiveFileUserInvitationDto extends UsersActiveFileUserDto {
  invitation: string;

  constructor(
    userActivation: UserActivationDto,
    file: File,
    user: User,
    invitation: string,
  ) {
    super(userActivation, file, user);
    this.invitation = invitation;
  }
}

export class UsersActiveUserDto extends UserActivationDto {
  user: UserDto;

  constructor(userActivation: UserActivationDto, user: User) {
    super();
    this.user = new UserDto(user);

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

export class UserActivationEntityDto extends UserActivationDto {
  userId: string;
  fileImageId: string;

  constructor(
    userId: string,
    id: string,
    details: string,
    fileImageId: string,
    timeAdded: string,
    active: number,
    name: string,
    male: number,
    female: number,
    activeDate: string,
    expirationDate: string,
    isActiveSocket: number,
    currentLives: number,
    longitude: string,
    latitude: string,
    socketId: string,
    createdAt: string,
    updatedAt: string,
  ) {
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

  public convertToDto(): UserActivationDto {
    const userActivationDto = new UserActivationDto();
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

export type UserActivationType =
  | UserActivationDto
  | UsersActiveFileDto
  | UsersActiveUserDto
  | UserActivationEntityDto
  | UsersActiveFileUserInvitationDto;
