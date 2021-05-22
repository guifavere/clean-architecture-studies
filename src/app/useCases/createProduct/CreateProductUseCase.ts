import { AppError } from '../../../infra/core/AppError';
import { Either, Result, left, right } from '../../../shared/core/Result';
import { UseCase } from '../../../shared/core/UseCase';

import { CreateProductDTO } from './CreateProductDTO';
import { CreateProductErrors } from './CreateProductErrors';
import { IProductRepo } from '../../repos/productRepo';
import { Product } from '../../../domain/entities/Product';

type Response = Either<
  CreateProductErrors.SkuAlreadyExistsError |
  AppError.UnexpectedError,
  Result<void>
>

export class CreateProductUseCase implements UseCase<CreateProductDTO, Promise<Response>> {
  private productRepo: IProductRepo;

  constructor(productRepo: IProductRepo) {
    this.productRepo = productRepo;
  }

  async execute(request: CreateProductDTO): Promise<Response> {
    // validate request

    try {
      try {
        const productWithSameSKU = await this.productRepo.getProductByProductSku(request.sku);
  
        if (productWithSameSKU) {
          return left(new CreateProductErrors.SkuAlreadyExistsError(request.sku));
        }
      } catch (error) {}
  
      const productOrError: Result<Product> = Product.create(request);
      
      if (productOrError.isFailure) {
        return left(Result.fail<Product>(productOrError.error.toString())) as Response;
      }

      const product: Product = productOrError.getValue();

      await this.productRepo.save(product);
  
      return right(Result.ok<void>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error)) as Response;
    }
  }
}
