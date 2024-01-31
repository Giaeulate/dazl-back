import { UserActivationType } from './indexDto';

export class UsersActiveDto {
  invitationsReceived: UserActivationType[] = [];
  invitationsSent: UserActivationType[] = [];
  invitationsAccepted: UserActivationType[] = [];
  listOfPossibleMatches: UserActivationType[] = [];
  remainingLives: any | number = 3;
  userActivationId: string;

  constructor(userActivationId: string) {
    this.userActivationId = userActivationId;
  }
}
