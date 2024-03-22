import { UserActivation } from '../UserActivation';
export declare class UserActivationDto {
    id: string;
    details: string;
    timeAdded: string;
    active: number;
    name: string;
    male: number;
    female: number;
    activeDate: string;
    expirationDate: string;
    currentLives: number;
    longitude: string;
    latitude: string;
    isActiveSocket: number;
    socketId: string;
    createdAt: string;
    updatedAt: string;
    static create(userActivation: UserActivation): UserActivationDto;
}
