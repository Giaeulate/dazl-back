import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserActivationDeactivatedDomainEvent } from '../../domain/UserActivationDeactivatedDomainEvent';
import { FinderUserPhotosAll } from '../../../user-photos/application/FinderAll/FinderUserPhotosAll';
import { UserId } from '../../../users/domain/UserId';
import { DeleteUserPhoto } from '../../../user-photos/application/DeletePhoto/DeleteUserPhoto';
import { FinderUser } from '../../../users/application/Finder/FinderUser';

@Injectable()
export class DeleteUserPhotosOnDeactivatedUserActivation {
  constructor(
    private readonly finderUser: FinderUser,
    private readonly finderUserPhotosAll: FinderUserPhotosAll,
    private readonly deleteUserPhoto: DeleteUserPhoto,
  ) {}

  @OnEvent(UserActivationDeactivatedDomainEvent.name)
  async on(event: UserActivationDeactivatedDomainEvent) {
    try {
      const user = await this.finderUser.run(new UserId(event.userId));
      if (user) {
        const userPhotos = await this.finderUserPhotosAll.run();
        const photosByUser = userPhotos.filter(({ userId }) =>
          userId.equals(user.id),
        );
        for (const userPhoto of photosByUser) {
          await this.deleteUserPhoto.run(userPhoto.photo);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
