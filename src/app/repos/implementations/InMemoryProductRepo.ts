import { IProductRepo } from '../productRepo';
import { Product } from '../../../domain/entities/Product';

export class InMemoryProductRepo implements IProductRepo {
  private products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  public async exists(productSku: string): Promise<boolean> {
    return this.products.some(p => p.sku === productSku);
  }

  public async getProductByProductId(productId: string): Promise<Product> {
    const product = this.products.find(p => p.id === productId);

    if (product === undefined) throw new Error('Product not found');

    return product;
  };

  public async getProductByProductSku(productSku: string): Promise<Product> {
    const product = this.products.find(p => p.sku === productSku);

    if (product === undefined) throw new Error('Product not found');

    return product;
  }

  public async save(product: Product): Promise<void> {
    const exists = await this.exists(product.sku);

    // if (!exists) {
    //   const newProduct = this.
    // }
  }
}