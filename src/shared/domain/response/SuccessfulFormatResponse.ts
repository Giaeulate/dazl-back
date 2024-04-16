import { FormatResponse } from './FormatResponse';

export class SuccessfulFormatResponse<Type> extends FormatResponse {
  readonly items: Type;

  constructor(items: Type, statusCode: number = 200) {
    super(true, 'Good Request', statusCode);
    this.items = items;
  }
}
