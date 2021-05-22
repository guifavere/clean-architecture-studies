import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(error: any) {
      const useCaseError = { message: 'An unexpected error occurred.' };

      super(false, useCaseError);
    }

    public static create(error: any): UnexpectedError {
      return new UnexpectedError(error);
    }
  }
}
