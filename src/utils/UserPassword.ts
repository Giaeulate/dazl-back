


export class UserPassword {
  constructor(public readonly value: string) {
    this.ensurePasswordIsValid(value);
    this.ensurePasswordHasUpperCase(value);
  }

  private ensurePasswordIsValid(value: string) {
    if (value.length < 8) {
      throw new Error(
        `The User Password <${value}> has less than 8 characters`,
      );
    }
  }

  private ensurePasswordHasUpperCase(value: string) {
    if (!value.match(/[A-Z]/)) {
      throw new Error(
        `The User Password <${value}> does not have an upper case letter`,
      );
    }
  }
}
