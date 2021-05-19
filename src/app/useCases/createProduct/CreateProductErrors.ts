import { Result } from '../../../shared/core/Result';
import { UseCaseError } from '../../../shared/core/UseCaseError';

export namespace CreateProductErrors {
  export class SkuAlreadyExistsError extends Result<UseCaseError> {
    constructor(sku: string) {
      super(false, `Already exists product with the sku: ${sku}`);
      // super(false, { message: `Already exists product with the sku: ${sku}` });
    }
  }
}
