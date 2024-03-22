import { UserActivationType } from './indexDto';
export declare class UsersActiveDto {
    invitationsReceived: UserActivationType[];
    invitationsSent: UserActivationType[];
    invitationsAccepted: UserActivationType[];
    listOfPossibleMatches: UserActivationType[];
    remainingLives: any | number;
    userActivationId: string;
    constructor(userActivationId: string);
}
