import { User } from '../User';
export declare class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    name: string;
    email: string;
    password: string;
    popularity: number;
    confirmationCode: string;
    confirmationTime: string;
    status: string;
    latitude: string;
    longitude: string;
    activeDate: string;
    expirationDate: string;
    createdAt: string;
    updatedAt: string;
    constructor(user: User);
}
