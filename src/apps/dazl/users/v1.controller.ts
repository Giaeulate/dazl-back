import { Body, Controller, Post, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { RequestChancePasswordDto } from './dto/RequestChancePasswordDto';
import { FormatResponse } from '../../../utils/FormatResponse';
import { SuccessfulFormatResponse } from '../../../utils/SuccessfulFormatResponse';
import { UsersService } from './users.service';

@Controller('v1')
export class V1Controller {

    constructor(private readonly usersService: UsersService) { }

    @Get('user/:id/getByPass')
    @HttpCode(HttpStatus.OK)
    async getUserByPass(@Param('id') id: string): Promise<FormatResponse> {
        const response = await this.usersService.getUserByPass(id);
        return new SuccessfulFormatResponse(response);
    }
}
