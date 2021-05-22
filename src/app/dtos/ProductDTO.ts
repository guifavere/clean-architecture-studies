export interface ProductDTO {
  name: string;
  sku: string;
  description?: string;
  stock?: number;
  cost_price?: number;
  sale_price?: number;
}
