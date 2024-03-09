import {BaseRepository} from './base-repository.js';
import {IProduct} from '../specification/interfaces.js';

export interface IProductRepository {
  createProduct(userId: string, title: string, price: number, description: string): Promise<void>;
  findProduct({productId}: {productId: string}): Promise<IProduct[] | []>;
  findProducts({
    sellerId,
    buyerId,
    isSelling,
  }: {
    sellerId?: string;
    buyerId?: string;
    isSelling?: boolean;
  }): Promise<IProduct[] | []>;
  updateProduct({
    productId,
    updated: {title, price, description, sellerId, buyerId, isSelling},
  }: {
    productId: string;
    updated: {
      title?: string;
      price?: number;
      description?: string;
      sellerId?: string;
      buyerId?: string;
      isSelling?: boolean;
    };
  }): Promise<IProduct | undefined>;
  deleteProduct(
    productId: string,
    sellerId: string,
    buyerId: string,
    isSelling: boolean,
  ): Promise<IProduct | undefined>;
}

export class ProductRepository extends BaseRepository implements IProductRepository {
  findProduct({productId}: {productId: string}): Promise<[] | IProduct[]> {
    throw new Error('Method not implemented.');
  }
  updateProduct({
    productId,
    updated: {title, price, description, sellerId, buyerId, isSelling},
  }: {
    productId: string;
    updated: {
      title?: string | undefined;
      price?: number | undefined;
      description?: string | undefined;
      sellerId?: string | undefined;
      buyerId?: string | undefined;
      isSelling?: boolean | undefined;
    };
  }): Promise<IProduct | undefined> {
    throw new Error('Method not implemented.');
  }
  async createProduct(userId: string, title: string, price: number, description: string) {
    await this.db.appendCSV(this.fileName, `${title},${price},${description},${userId},,${true}`);
  }

  async findProducts({
    sellerId,
    buyerId,
    isSelling,
  }: {
    sellerId?: string;
    buyerId?: string;
    isSelling?: boolean;
  }) {
    if (sellerId) {
      return [];
    } else if (buyerId) {
      return [];
    } else if (isSelling === true) {
      return [];
    } else if (isSelling === false) {
      return [];
    }
    return [];
  }

  deleteProduct(
    productId: string,
    sellerId: string,
    buyerId: string,
    isSelling: boolean,
  ): Promise<IProduct | undefined> {
    throw new Error('Method not implemented.');
  }
}
