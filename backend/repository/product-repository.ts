export interface IProductRepository {
  findProductsByBuyerId(buyerID: string): void;
}

export class ProductRepository implements IProductRepository {
  findProductsByBuyerId = () => {};

  findSellingProducts = () => {};

  findProductUsingId = () => {};
}
