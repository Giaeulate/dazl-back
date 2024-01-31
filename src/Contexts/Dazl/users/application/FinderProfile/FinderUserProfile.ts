import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import {
  USER_PHOTO_REPOSITORY,
  USER_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserId } from '../../domain/UserId';
import { UserPhotoRepository } from '../../../user-photos/domain/UserPhotoRepository';
import { GetterLastUserActiveStillService } from '../../../user_activation/application/getter-last-still-active/getter-last-user-active-still.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';

@Injectable()
export class FinderUserProfile {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(USER_PHOTO_REPOSITORY)
    private readonly userPhotoRepository: UserPhotoRepository,
    private readonly getterLastUserActiveStillService: GetterLastUserActiveStillService,
    private readonly fileFinderService: FileFinderService,
  ) {}

  async run(id: UserId): Promise<any> {
    console.log('id', id);
    const user = await this.userRepository.search(id);
    this.ensureUserExist(user);
    const userActivation = await this.getterLastUserActiveStillService.run(id);
    if (!userActivation) {
      throw new UnauthorizedException('User Not Active');
    }
    const userPhotos = await this.userPhotoRepository.searchAll();
    const userPhotosFilter = userPhotos.filter((userPhoto) =>
      userPhoto.userId.equals(id),
    );

    const filesPromise = userPhotosFilter.map(async (userPhoto) => {
      return await this.fileFinderService.invoke(userPhoto.photo);
    });
    const files = await Promise.all(filesPromise);
    const file = await this.fileFinderService.invoke(
      userActivation.fileImageId,
    );

    //order by createdAt

    const filesSorted = files.sort((a, b) => {
      if (a.createdAt.value > b.createdAt.value) {
        return 1;
      }
      if (a.createdAt.value < b.createdAt.value) {
        return -1;
      }
      return 0;
    });

    return {
      profile_image: file.location.value,
      name: userActivation.name.value,
      gender: user.gender.value,
      details: userActivation.details.value,
      age: user.age.value,
      email: user.email.value,
      activation_end: this.convertMillisecondsToDate(
        userActivation.expirationDate.value,
      ),
      server_time: this.convertMillisecondsToDate(
        new Date().getTime().toString(),
      ),
      social_networks: {
        email: user.otherEmail.value,
        instagram: user.instagramUrl.value,
        whatsapp: user.whatsappUrl.value,
      },
      photos: filesSorted.map((file) => file.toPrimitives()),
    };
  }

  private convertMillisecondsToDate(milisegundos: string): Date {
    // Convierte la cadena de milisegundos a un número entero
    const milisegundosNum = parseInt(milisegundos);

    // Crea un objeto Date a partir de los milisegundos
    const fecha = new Date(milisegundosNum);

    // Agrega 4 horas a la fecha
    fecha.setHours(fecha.getHours());

    // Retorna la fecha resultante
    return fecha;
  }

  private ensureUserExist(user: User) {
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
