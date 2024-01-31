import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../../user_activation/domain/UserActivationRepository';

@Injectable()
export class UsersActivationLatLogService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
  ) {}

  async run({
    startDateString,
    endDateString,
  }: {
    startDateString: string;
    endDateString: string;
  }): Promise<any> {
    const startDate = this.ensureDateFormatIsValid(startDateString);
    const endDate = this.ensureDateFormatIsValid(endDateString);
    this.ensureDateIsValid(startDateString, endDateString);

    const userActivations = await this.userActivationRepository.searchAll();
    return userActivations
      .filter((userActivation) => {
        const date = new Date(userActivation.createdAt.value);
        if (startDate.getTime() == endDate.getTime())
          return date.getTime() >= startDate.getTime();
        return (
          date.getTime() >= startDate.getTime() &&
          date.getTime() <= endDate.getTime()
        );
      })
      .map((userActivation) => userActivation.toPrimitives());
  }

  private ensureDateFormatIsValid(startDate: string): Date {
    const date = new Date(startDate);
    if (date.toString() === 'Invalid Date') {
      throw new BadRequestException('Invalid date format');
    }
    return date;
  }

  private ensureDateIsValid(startDateString: string, endDateString: string) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    if (startDate > endDate) {
      throw new BadRequestException('Invalid date range');
    }
  }

  // get all days between two dates
  private getDates(startDate: Date, endDate: Date) {
    const dates = [];
    const theDate = new Date(startDate);
    while (theDate < endDate) {
      dates.push(new Date(theDate));
      theDate.setDate(theDate.getDate() + 1);
    }
    return dates;
  }
}
