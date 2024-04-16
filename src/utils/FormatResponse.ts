export class FormatResponse {
  status: boolean;
  message: string;
  statusCode: number;

  constructor(status: boolean, message: string, statusCode: number) {
    this.status = status;
    this.message = message;
    this.statusCode = statusCode;
  }
}
