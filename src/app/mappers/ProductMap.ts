import { Mapper } from '../../infra/Mapper';
import { Product } from '../../domain/entities/Product';
import { ProductDTO } from '../dtos/ProductDTO';

export class ProductMap implements Mapper<Product> {
  public static toDTO(product: Product): ProductDTO {
    return {
      name: product.name,
      sku: product.sku,
      description: product.description,
      stock: product.stock,
      cost_price: product.cost_price,
      sale_price: product.sale_price,
    };
  }

  public static toDomain(raw: any): Product {

  }

  public static toPersistence(product: Product): Promise<any> {
  }
}
