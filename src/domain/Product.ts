import { uuid } from 'uuidv4';
import { Guard, IGuardArgument } from '../shared/core/Guard';
import { Result } from '../shared/core/Result';

interface ProductProps {
  name: string;
  sku: string;
  description?: string;
  stock?: number;
  cost_price?: number;
  sale_price?: number;
}

class Product {
  public readonly id: string;

  public name: string;
  public sku: string;
  public description?: string = '';
  public stock?: number = 0;
  public cost_price?: number = 0;
  public sale_price?: number = 0;

  private constructor(props: ProductProps, id?: string) {
    const updatedProps = { ...props, id: id || uuid() };

    Object.assign(this, updatedProps);
  }

  public static create(props: ProductProps, id?: string): Result<Product> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.sku, argumentName: 'sku' },
    ]

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (!guardResult.succeeded) {
      return Result.fail<Product>(guardResult.message);
    }

    const product = new Product(props, id);

    return Result.ok<Product>(product);
  }
}

export { Product };
