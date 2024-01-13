export interface IProductRepository {
  findProductsByBuyerID(buyerID: string): void;
}

export class ProductRepository implements IProductRepository {
  findProductsByBuyerID(buyerID: string): void {}
}
