import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../../user_activation/domain/UserActivationRepository';

@Injectable()
export class FrequencyGetterByRangeAndDateReportService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
  ) {}

  //filtrar los usuarios por rangos de hora to 00 from 08, 08 from 16, 16 from 00, by day
  async run({ dateString }: { dateString: string }) {
    const date = this.ensureDateFormatIsValid(dateString);
    const userActivations = await this.userActivationRepository.searchAll();
    const userActivationsByRange = userActivations.filter((userActivation) => {
      const createdAt = new Date(userActivation.createdAt.value);
      return createdAt.getDate() === date.getDate();
    });
    const userActivationsByRangeAndHours = userActivationsByRange.reduce(
      (acc, userActivation) => {
        const createdAt = new Date(userActivation.createdAt.value);
        const hour = createdAt.getHours();
        if (hour >= 0 && hour < 8) {
          acc['0-8'] = acc['0-8'] ? acc['0-8'] + 1 : 1;
        }
        if (hour >= 8 && hour < 16) {
          acc['8-16'] = acc['8-16'] ? acc['8-16'] + 1 : 1;
        }
        if (hour >= 16 && hour < 24) {
          acc['16-24'] = acc['16-24'] ? acc['16-24'] + 1 : 1;
        }
        return acc;
      },
      {
        '0-8': 0,
        '8-16': 0,
        '16-24': 0,
        total: userActivationsByRange.length,
      },
    );
    console.log(userActivationsByRangeAndHours);
    return userActivationsByRangeAndHours;
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
}
