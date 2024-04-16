import { Body, Controller, Post } from '@nestjs/common';
import { RequestChancePasswordDto } from './dto/RequestChancePasswordDto';
import { FormatResponse } from '../../../utils/FormatResponse';
import { SuccessfulFormatResponse } from '../../../utils/SuccessfulFormatResponse';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post('change-password')
    async changePassword(
        @Body() request: RequestChancePasswordDto,
    ): Promise<FormatResponse> {
        // console.log(request);
        const response = await this.usersService.updatePassword(request);
        return new SuccessfulFormatResponse(response);
        // return new SuccessfulFormatResponse({});
    }
}
