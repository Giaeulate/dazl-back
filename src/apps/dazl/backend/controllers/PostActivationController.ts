import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { UserActivationRequestDto } from '../../../../Contexts/Dazl/user_activation/application/dto/UserActivationRequestDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers';
import { Express } from 'express';
import { UploadUserImageService } from '../../../../Contexts/Dazl/file/application/creator/upload-user-image.service';
import { AuthGuard } from '@nestjs/passport';
import { UserActivationCreatorOrActivatorService } from '../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service';
import { UserLiveAllByUserSearcher } from '../../../../Contexts/Dazl/user-live/application/search-all-by-user/UserLiveAllByUserSearcher';
import { UserLiveByUserCreator } from '../../../../Contexts/Dazl/user-live/application/create-by-user/UserLiveByUserCreator';
import { UpdaterUserService } from '../../../../Contexts/Dazl/users/application/updater/updater-user.service';
import { ModuleGateway } from '../gateways/module.gateway';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';
import { ChannelName } from '../gateways/constants';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../../../Contexts/Dazl/auth/domain/interfaces/jwt-payload.interface';

@Controller('v1/user-activation')
@UseGuards(AuthGuard('jwt'))
export class PostActivationController {
  constructor(
    private readonly uploadUserImageService: UploadUserImageService,
    private readonly userActivationCreatorOrActivatorService: UserActivationCreatorOrActivatorService,
    private readonly liveAllByUserSearcher: UserLiveAllByUserSearcher,
    private readonly liveByUserCreator: UserLiveByUserCreator,
    private readonly updaterUserService: UpdaterUserService,
    private readonly moduleGateway: ModuleGateway,
    private readonly activationFinder: UserActivationFinder,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('active')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
    }),
  )
  public async run(
    @UploadedFile() file: Express.Multer.File,
    @Body() activationRequestDto: UserActivationRequestDto,
    @Headers('authorization') payload: any,
  ) {
    //get token
    const token = payload.split(' ')[1];
    const jti = this.jwtService.decode(token) as JwtPayload;
    if (!file) throw new BadRequestException('file is required');

    const photo = await this.uploadUserImageService.run(file, true, true);
    activationRequestDto = {
      ...activationRequestDto,
      fileId: photo.thumbnail.id.value,
    };
    const userActivation =
      await this.userActivationCreatorOrActivatorService.run(
        jti.id,
        activationRequestDto,
        '',
        token,
      );
    let lives = await this.liveAllByUserSearcher.run(
      userActivation.userId.value,
    );
    if (lives.length === 0) {
      await this.liveByUserCreator.run({
        userId: userActivation.userId.value,
      });
    }
    await this.updaterUserService.run(userActivation.userId, {
      tokenFirebase: activationRequestDto.tokenFirebase,
    });
    const list = await this.getterUserActivationStatusService.run(
      userActivation.id.value,
      {
        lowerAge: userActivation.ageLowerFilter,
        upperAge: userActivation.ageUpperFilter,
        distance: userActivation.distanceFilter,
      },
    );
    for (const user of list.listOfPossibleMatches) {
      const userActivationOnly = await this.activationFinder.run(
        new UserActivationId(user.id),
      );

      const list = await this.getterUserActivationStatusService.run(
        userActivationOnly.id.value,
        {
          lowerAge: userActivationOnly.ageLowerFilter,
          upperAge: userActivationOnly.ageUpperFilter,
          distance: userActivationOnly.distanceFilter,
        },
      );
      this.moduleGateway.wss
        .to(userActivationOnly.userId.value)
        .emit(ChannelName.IAM_ACTIVE, list);
    }
    return list;
  }
}
