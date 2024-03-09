export interface IProductRepository {
  findProductsByBuyerId(buyerID: string): void;
  findSellingProducts(): void;
  findProductUsingId(productID: string): void;
}

export class ProductRepository implements IProductRepository {
  findProductsByBuyerId = () => {};

  findSellingProducts = () => {};

  findProductUsingId = () => {};
}
