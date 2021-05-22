import { Product } from '../../domain/entities/Product';

export interface IProductRepo {
  exists(productSku: string): Promise<boolean>;
  getProductByProductId(productId: string): Promise<Product>;
  getProductByProductSku(productSku: string): Promise<Product>;
  save(product: Product): Promise<void>;
}
