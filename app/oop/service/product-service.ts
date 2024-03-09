import {IProduct} from '../specification/interfaces.js';

export interface IProductService {
  getBuyProducts(userID: string): IProduct[];
  getSellingProducts(): IProduct[];
  buyProductUsingID(id: string, userID: string): Boolean;
}

export class ProductService implements IProductService {
  getBuyProducts(userID: string): IProduct[] {
    throw new Error();
  }

  getSellingProducts(): IProduct[] {
    throw new Error();
  }

  buyProductUsingID(id: string, userID: string): boolean {
    return true;
  }
}
