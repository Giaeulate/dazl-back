import { Controller, Get } from '@nestjs/common';

@Controller('loaderio-0ba4f75b54e0e445bee0419ced934113')
export class LoaderController {
  @Get()
  async run(): Promise<string> {
    return 'loaderio-0ba4f75b54e0e445bee0419ced934113';
  }
}
