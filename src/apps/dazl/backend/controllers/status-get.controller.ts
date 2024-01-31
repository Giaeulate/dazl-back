import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('status')
export class StatusGetController {
  @Get()
  @HttpCode(HttpStatus.OK)
  async run() {
    return;
  }
}
