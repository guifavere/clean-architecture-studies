import { Guard, IGuardResult } from './Guard';

describe('The combine method', () => {
  it('should return succeeded: false, when some result is failed', () => {
    const guardResults: IGuardResult[] = [
      { succeeded: true },
      { succeeded: false, message: 'some error' },
    ];
    const { succeeded } = Guard.combine(guardResults);

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: true, when there are no failed results', () => {
    const guardResults: IGuardResult[] = [
      { succeeded: true },
      { succeeded: true },
    ];
    const { succeeded } = Guard.combine(guardResults);

    expect(succeeded).toBeTruthy();
  })
});

describe('The greaterThan method', () => {
  it('should return succeeded: false, when minimumValue greater than actualValue', () => {
    const { succeeded } = Guard.greaterThan(2, 1);

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: false, when minimumValue equals to actualValue', () => {
    const { succeeded } = Guard.greaterThan(4, 4);

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: true, when minimumValue lower than actualValue', () => {
    const { succeeded } = Guard.greaterThan(6, 9);

    expect(succeeded).toBeTruthy();
  });
});

describe('The againstAtLeast method', () => {
  it('should return succeeded: false, when text length lower than numChars', () => {
    const { succeeded } = Guard.againstAtLeast(5, 'test');

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: true, when text length equals to numChars', () => {
    const { succeeded } = Guard.againstAtLeast(4, 'test');

    expect(succeeded).toBeTruthy();
  });

  it('should return succeeded: true, when text length greater than numChars', () => {
    const { succeeded } = Guard.againstAtLeast(8, 'test test');

    expect(succeeded).toBeTruthy();
  });
});

describe('The againstAtMost method', () => {
  it('should return succeeded: false, when text length greater than numChars', () => {
    const { succeeded } = Guard.againstAtMost(3, 'test');

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: true, when text length equals to numChars', () => {
    const { succeeded } = Guard.againstAtMost(4, 'test');

    expect(succeeded).toBeTruthy();
  });

  it('should return succeeded: true, when text length lower than numChars', () => {
    const { succeeded } = Guard.againstAtMost(10, 'test test');

    expect(succeeded).toBeTruthy();
  });
});

describe('The againstNullOrUndefined method', () => {
  it('should return succeeded: false, when argument is: null', () => {
    const { succeeded } = Guard.againstNullOrUndefined(null, 'value');

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: false, when argument is: undefined', () => {
    const { succeeded } = Guard.againstNullOrUndefined(undefined, 'value');

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: true, when argument has value', () => {
    const { succeeded } = Guard.againstNullOrUndefined('test', 'value');

    expect(succeeded).toBeTruthy();
  });
});

describe('The againstNullOrUndefinedBulk method', () => {
  it('should return succeeded: false, when some argument is: null', () => {
    const args = [
      { argument: null, argumentName: 'name' },
      { argument: 22, argumentName: 'age' },
    ];
    const { succeeded } = Guard.againstNullOrUndefinedBulk(args);

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: false, when some argument is: undefined', () => {
    const args = [
      { argument: 'john doe', argumentName: 'name' },
      { argument: undefined, argumentName: 'age' },
    ];
    const { succeeded } = Guard.againstNullOrUndefinedBulk(args);

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: true, when all arguments have value', () => {
    const args = [
      { argument: 'john doe', argumentName: 'name' },
      { argument: 55, argumentName: 'age' },
    ];
    const { succeeded } = Guard.againstNullOrUndefinedBulk(args);

    expect(succeeded).toBeTruthy();
  });
});

describe('The isOneOf method', () => {
  it("should return succeeded: false, when argument isn't one of the correct types", () => {
    const { succeeded } = Guard.isOneOf('darkseid', ['batman', 'superman'], 'hero');

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: true, when argument is one of the correct types', () => {
    const { succeeded } = Guard.isOneOf('batman', ['batman', 'superman'], 'hero');

    expect(succeeded).toBeTruthy();
  });
});

describe('The inRange method', () => {
  it("should return succeeded: false, when the argument isn't within the range", () => {
    const { succeeded } = Guard.inRange(5, 6, 10, 'age');

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: true, when the argument is within the range', () => {
    const { succeeded } = Guard.inRange(6, 6, 10, 'age');

    expect(succeeded).toBeTruthy();
  });
});

describe('The allInRange method', () => {
  it("should return succeeded: false, when some argument isn't within the range", () => {
    const numbers = [6, 2];
    const { succeeded } = Guard.allInRange(numbers, 5, 10, 'age');

    expect(succeeded).toBeFalsy();
  });

  it('should return succeeded: true, when some argument is within the range', () => {
    const numbers = [5, 6];
    const { succeeded } = Guard.allInRange(numbers, 5, 10, 'age');

    expect(succeeded).toBeTruthy();
  });
});
