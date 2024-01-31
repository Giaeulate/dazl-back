import { Invitation } from '../Invitation';

export class InvitationDto {
  id: string;
  userActivationFromId: string;
  userActivationToId: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  constructor(invitation: Invitation) {
    this.id = invitation.id.value;
    this.userActivationFromId = invitation.userActivationFromId.value;
    this.userActivationToId = invitation.userActivationToId.value;
    this.status = invitation.status.value;
    this.createdAt = invitation.createdAt.value;
    this.updatedAt = invitation.updatedAt.value;
  }
}
