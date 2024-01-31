import { MotherCreator } from './MotherCreator';

export class WordMother {
  static random(): string {
    return MotherCreator.random().lorem.word();
  }

  static numberRandom(): number {
    return MotherCreator.random().datatype.number();
  }

  static randomWithLength(length: number): string {
    return MotherCreator.random().lorem.word(length);
  }

  static randomDate(): Date {
    return MotherCreator.random().date.past();
  }

  static randomEmail(): string {
    return MotherCreator.random().internet.email();
  }

  static randomPassword(): string {
    return MotherCreator.random().internet.password();
  }

  static randomUuid(): string {
    return MotherCreator.random().datatype.uuid();
  }
}
