import { FormatResponse } from './FormatResponse';

export class NotSuccessfulFormatResponse<Type> extends FormatResponse {
  readonly items: Type;

  constructor(items: Type, statusCode: number = 400) {
    super(false, 'Bad Request', statusCode);
    this.items = items;
  }
}
