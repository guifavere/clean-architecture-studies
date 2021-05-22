import { Entity } from './Entity';
import { UniqueEntityID } from './UniqueEntityID';
import { Guard } from '@core/Guard';
import { Result } from '@core/Result';

interface ProductProps {
  name: string;
  sku: string;
  description?: string;
  stock?: number;
  cost_price?: number;
  sale_price?: number;
}

class Product extends Entity<ProductProps> {
  public name: string;
  public sku: string;
  public description?: string;
  public stock?: number;
  public cost_price?: number;
  public sale_price?: number;

  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ProductProps, id?: UniqueEntityID): Result<Product> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.sku, argumentName: 'sku' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Product>(guardResult.message);
    }

    const product = new Product({
      ...props,
      stock: 0,
      cost_price: 0,
      sale_price: 0,
    }, id);

    return Result.ok<Product>(product);
  }
}

export { Product };
