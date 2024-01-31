import {
  Controller,
  Delete,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DeleteUserPhoto } from '../../../../Contexts/Dazl/user-photos/application/DeletePhoto/DeleteUserPhoto';
import { FileId } from '../../../../Contexts/Dazl/file/domain/FileId';
import { FinderUserProfile } from '../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile';
import { UserId } from '../../../../Contexts/Dazl/users/domain/UserId';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../../../../Contexts/Dazl/auth/domain/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

export class Params {
  id: string;
}

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class DeletePhotoUserController {
  constructor(
    private readonly deleteUserPhoto: DeleteUserPhoto,
    private readonly finderUser: FinderUserProfile,
    private readonly jwtService: JwtService,
  ) {}

  @Delete('photo/:id')
  @HttpCode(HttpStatus.OK)
  async run(@Param() params: Params, @Headers('authorization') payload: any) {
    const token = payload.split(' ')[1];
    const jti = this.jwtService.decode(token) as JwtPayload;
    await this.deleteUserPhoto.run(new FileId(params.id));
    const response = await this.finderUser.run(new UserId(jti.id));
    return {
      status: true,
      message: 'User',
      item: response,
    };
  }
}
