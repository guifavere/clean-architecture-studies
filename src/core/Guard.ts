interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

interface IGuardArgument {
  argument: any;
  argumentName: string;
}

type GuardArgumentCollection = IGuardArgument[];

class Guard {
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (let result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true };
  }

  public static greaterThan(minValue: number, actualValue: number): IGuardResult {
    return actualValue > minValue 
      ? { succeeded: true } 
      : { 
        succeeded: false, 
        message: `Number given {${actualValue}} is not greater than {${minValue}}`
      };
  }

  public static againstAtLeast(numChars: number, text: string): IGuardResult {
    return text.length >= numChars 
      ? { succeeded: true } 
      : { 
        succeeded: false, 
        message: `Text is not at least ${numChars} chars.`
      };
  }

  public static againstAtMost(numChars: number, text: string): IGuardResult {
    return text.length <= numChars 
      ? { succeeded: true } 
      : { 
        succeeded: false, 
        message: `Text is greater than ${numChars} chars.`
      };
  }

  public static againstNullOrUndefined(argument: any, argumentName: string): IGuardResult {
    return (argument === null || argument === undefined)
      ? { succeeded: false, message: `${argumentName} is null or undefined` }
      : { succeeded: true }
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);

      if (!result.succeeded) return result;
    }

    return { succeeded: true }
  }

  public static isOneOf(value: any, validValues: any[], argumentName: string): IGuardResult {
    const isValid = validValues.some(validValue => validValue === value);

    return isValid
      ? { succeeded: true }
      : { 
        succeeded: false, 
        message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".` 
      };
  }

  public static inRange(num: number, min: number, max: number, argumentName: string): IGuardResult {
    const isInRange = num >= min && num <= max;

    return isInRange
      ? { succeeded: true }
      : { succeeded: false, message: `${argumentName} is not within range ${min} to ${max}.`};
  }

  public static allInRange(numbers: number[], min: number, max: number, argumentName: string): IGuardResult {
    for (let num of numbers) {
      const result = this.inRange(num, min, max, argumentName);

      if (!result.succeeded) return result;
    }

    return{ succeeded: true };
  }
}

export { Guard, GuardArgumentCollection, IGuardArgument, IGuardResult };
