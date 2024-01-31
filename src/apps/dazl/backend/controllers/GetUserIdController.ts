import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FinderUserProfile } from '../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile';
import { UserId } from '../../../../Contexts/Dazl/users/domain/UserId';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class GetUserIdController {
  constructor(private readonly finderUser: FinderUserProfile) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async run(@Param('id') id: string) {
    const response = await this.finderUser.run(new UserId(id));
    return {
      status: true,
      message: 'User',
      item: response,
    };
  }
}
