import { Invitation } from '../Invitation';
export declare class InvitationDto {
    id: string;
    userActivationFromId: string;
    userActivationToId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    constructor(invitation: Invitation);
}
