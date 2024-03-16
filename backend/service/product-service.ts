import {Repository} from '../repository/repository.js';
import {IProduct} from '../domain/product.js';

export interface IProductService {
  addSellerProduct(
    userId: string,
    title: string,
    price: number,
    description: string,
  ): Promise<boolean>;
  getBuyProducts(userID: string): Promise<IProduct[]>;
  getSellingProducts(): Promise<IProduct[]>;
  buyProductUsingID(id: string, userID: string): Boolean;
}
export class ProductService implements IProductService {
  getBuyProducts(userID: string): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }
  buyProductUsingID(id: string, userID: string): Boolean {
    throw new Error('Method not implemented.');
  }
  async addSellerProduct(userId: string, title: string, price: number, description: string) {
    if (!userId || userId.trim() === '') {
      return false;
    }
    if (!title || title.trim() === '') {
      return false;
    }
    if (!description || description.trim() === '') {
      return false;
    }

    await Repository.Instance.Product.createProduct(userId, title, price, description);
    return true;
  }
  async getSellingProducts() {
    const products = await Repository.Instance.Product.findProducts({
      isSelling: true,
    });
    return products.map((v) => v.Convert());
  }
}
