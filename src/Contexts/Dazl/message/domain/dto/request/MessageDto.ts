export class MessageDto {
  id: string;
  text: string;
  url: string;
  channel: string;
  userFromId: string; // UserActivationId
  userToId: string; // UserConnect
  response: string; // MessageId
}
