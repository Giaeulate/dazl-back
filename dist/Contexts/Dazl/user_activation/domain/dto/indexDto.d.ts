import { UserActivationDto } from './UserActivationDto';
import { User } from '../../../users/domain/User';
import { FileDto } from '../../../file/domain/dto/FileDto';
import { File } from '../../../file/domain/File';
import { UserDto } from '../../../users/domain/dto/UserDto';
export declare class UsersActiveFileDto extends UserActivationDto {
    file: FileDto;
    constructor(userActivation: UserActivationDto, file: File);
}
export declare class UsersActiveFileUserDto extends UserActivationDto {
    file: FileDto;
    user: UserDto;
    constructor(userActivation: UserActivationDto, file: File, user: User);
}
export declare class UsersActiveFileUserInvitationDto extends UsersActiveFileUserDto {
    invitation: string;
    constructor(userActivation: UserActivationDto, file: File, user: User, invitation: string);
}
export declare class UsersActiveUserDto extends UserActivationDto {
    user: UserDto;
    constructor(userActivation: UserActivationDto, user: User);
}
export declare class UserActivationEntityDto extends UserActivationDto {
    userId: string;
    fileImageId: string;
    constructor(userId: string, id: string, details: string, fileImageId: string, timeAdded: string, active: number, name: string, male: number, female: number, activeDate: string, expirationDate: string, isActiveSocket: number, currentLives: number, longitude: string, latitude: string, socketId: string, createdAt: string, updatedAt: string);
    convertToDto(): UserActivationDto;
}
export type UserActivationType = UserActivationDto | UsersActiveFileDto | UsersActiveUserDto | UserActivationEntityDto | UsersActiveFileUserInvitationDto;
