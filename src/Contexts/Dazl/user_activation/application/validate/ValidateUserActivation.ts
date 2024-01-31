import { Injectable } from '@nestjs/common';
import { UserActivationRequestDto } from '../dto/UserActivationRequestDto';

@Injectable()
export class ValidateUserActivation {
  constructor() {}

  // validate fields of request
  async run(request: UserActivationRequestDto) {}
}
