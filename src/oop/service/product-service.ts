import {IProduct} from '../specification/interfaces';

export interface IProductService {
  getBuyProducts(userID: string): IProduct[];
  getSellingProducts(): IProduct[];
  buyProductUsingID(productID: string, userID: string): Boolean;
}

export class ProductService implements IProductService {
  getBuyProducts(userID: string): IProduct[] {
    throw new Error();
  }

  getSellingProducts(): IProduct[] {
    throw new Error();
  }

  buyProductUsingID(productID: string, userID: string): Boolean {}
}
