class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean
  public error: T | string;
  private _value: T;

  public constructor (isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error");
    }
    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result needs to contain an error message");
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
    
    Object.freeze(this);
  }

  public getValue () : T {
    if (!this.isSuccess) {
      console.log(this.error,);
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.")
    } 

    return this._value;
  }

  public errorValue (): T {
    return this.error as T;
  }

  public static ok<U> (value?: U) : Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U> (error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine (results: Result<any>[]) : Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}

type Either<L, A> = Left<L, A> | Right<L, A>;

class Left<L, A> {
  public readonly value: L;

  public constructor(value: L) {
    this.value = value;
  }

  public isLeft(): this is Left<L, A> {
    return true;
  }

  public isRight(): this is Right<L, A> {
    return false;
  }
}

class Right<L, A> {
  public readonly value: A;

  public constructor(value: A) {
    this.value = value;
  }

  public isLeft(): this is Left<L, A> {
    return false;
  }

  public isRight(): this is Right<L, A> {
    return true;
  }
}

function left<L, A>(l: L): Either<L, A> {
  return new Left(l);
}

function right<L, A>(a: A): Either<L, A> {
  return new Right<L, A>(a);
}

export { Left, Result, Right, left, right, Either };
