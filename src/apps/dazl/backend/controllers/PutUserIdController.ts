import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdaterUserService } from '../../../../Contexts/Dazl/users/application/updater/updater-user.service';
import { UserId } from '../../../../Contexts/Dazl/users/domain/UserId';
import { AuthGuard } from '@nestjs/passport';
import { FinderUserProfile } from '../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreatorExternalUserPhoto } from '../../../../Contexts/Dazl/user-photos/application/CreatorExternal/CreatorExternalUserPhoto';
import { UpdaterPhotoUserActivation } from '../../../../Contexts/Dazl/user_activation/application/updater-photo/updater-photo-user-activation';
import { UserActivationDetails } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationDetails';
import { UserActivationMale } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationMale';
import { IsBoolean } from '../../../../Contexts/Dazl/Shared/IsBoolean';
import { UserActivationFemale } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationFemale';
import { UserActivationLgtb } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationLgtb';
import { ForbiddenWordAllSearcher } from '../../../../Contexts/Dazl/forbidden_words/application/search-all/ForbiddenWordAllSearcher';

class BodyPutUserIdController {
  instagram?: string;
  whatsapp?: string;
  email?: string;
  details?: string;
  male?: string;
  female?: string;
  lgtb?: string;
  add_to_album: Express.Multer.File;
  active_photo: Express.Multer.File;
}

class ParamsFiles {
  add_to_album: Array<Express.Multer.File>;
  active_photo: Array<Express.Multer.File>;
}

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class PutUserIdController {
  constructor(
    private readonly updaterUserService: UpdaterUserService,
    private readonly finderUser: FinderUserProfile,
    private readonly creatorExternalUserPhoto: CreatorExternalUserPhoto,
    private readonly updaterPhotoUserActivation: UpdaterPhotoUserActivation,
    private readonly forbiddenWordAllSearcher: ForbiddenWordAllSearcher,
  ) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'add_to_album', maxCount: 1 },
      {
        name: 'active_photo',
        maxCount: 1,
      },
    ]),
  )
  async run(
    @Param('id') id: string,
    @Body() body: BodyPutUserIdController,
    @UploadedFiles() files: ParamsFiles,
  ) {
    const words = await this.forbiddenWordAllSearcher.search();

    console.log('PutUserIdController', files);
    console.log('PutUserIdController', body);
    const { instagram, whatsapp, email } = body;
    await this.updaterUserService.run(new UserId(id), {
      otherEmail: email,
      instagramUrl: instagram,
      whatsappUrl: whatsapp,
    });

    if (files.active_photo?.length > 0) {
      const active_photo = files.active_photo[0];

      await this.updaterPhotoUserActivation.run(
        active_photo,
        UserActivationDetails.checkForbiddenTerms(
          words.map((word) => word.text.value.toString()),
          body.details,
        ),
        new UserActivationMale(body.male ? IsBoolean.TRUE : IsBoolean.FALSE),
        new UserActivationFemale(
          body.female ? IsBoolean.TRUE : IsBoolean.FALSE,
        ),
        new UserActivationLgtb(body.lgtb ? IsBoolean.TRUE : IsBoolean.FALSE),
        new UserId(id),
      );
    }

    console.log('body', body.male);
    console.log('body', body.female);
    console.log('body', body.lgtb);
    await this.updaterPhotoUserActivation.run(
      null,
      UserActivationDetails.checkForbiddenTerms(
        words.map((word) => word.text.value.toString()),
        body.details,
      ),
      new UserActivationMale(
        body.male === '1' ? IsBoolean.TRUE : IsBoolean.FALSE,
      ),
      new UserActivationFemale(
        body.female === '1' ? IsBoolean.TRUE : IsBoolean.FALSE,
      ),
      new UserActivationLgtb(
        body.lgtb === '1' ? IsBoolean.TRUE : IsBoolean.FALSE,
      ),
      new UserId(id),
    );

    if (files.add_to_album?.length > 0) {
      const add_to_album = files.add_to_album[0];
      await this.creatorExternalUserPhoto.run(add_to_album, new UserId(id));
    }

    const response = await this.finderUser.run(new UserId(id));
    return {
      status: true,
      message: 'User updated',
      item: response,
    };
  }
}
