import { Product } from '../../domain/Product';

export interface IProductRepo {
  exists(productSku: string): Promise<boolean>;
  getProductByProductId(productId: string): Promise<Product>;
  getProductByProductSku(productSku: string): Promise<Product>;
}
