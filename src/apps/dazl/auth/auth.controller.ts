import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginRequestDto } from './dto/user.login.request.dto';
import { FormatResponse } from 'src/utils/FormatResponse';
import { SuccessfulFormatResponse } from 'src/utils/SuccessfulFormatResponse';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async run(@Body() request: UserLoginRequestDto): Promise<FormatResponse> {
        const response = await this.authService.updateUserToken(request);
        delete response.token;
        return new SuccessfulFormatResponse(response, HttpStatus.OK);
    }

    @Post('/login/activation')
    @HttpCode(HttpStatus.OK)
    async runActivation(
        @Body() request: UserLoginRequestDto,
    ): Promise<FormatResponse> {
        return new SuccessfulFormatResponse(
            await this.authService.updateUserToken(request),
            HttpStatus.OK,
        );
    }
}
