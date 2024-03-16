import {BaseRepository} from './base-repository.js';
import Product, {IProductDomain, IProductEntity} from '../domain/product.js';
import ProductDomain from '../domain/product.js';

export interface IProductRepository {
  createProduct(userId: string, title: string, price: number, description: string): Promise<void>;
  findProduct({productId}: {productId: string}): Promise<IProductDomain[] | []>;
  findProducts({
    sellerId,
    buyerId,
    isSelling,
  }: {
    sellerId?: string;
    buyerId?: string;
    isSelling?: boolean;
  }): Promise<IProductDomain[] | []>;
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
  }): Promise<IProductDomain | undefined>;
  deleteProduct(
    productId: string,
    sellerId: string,
    buyerId: string,
    isSelling: boolean,
  ): Promise<IProductDomain | undefined>;
}

export class ProductRepository extends BaseRepository implements IProductRepository {
  findProduct({productId}: {productId: string}): Promise<[] | IProductDomain[]> {
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
  }): Promise<IProductDomain | undefined> {
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
    } else if (isSelling) {
      const productEntities = await this.db.readCSV<IProductEntity>(this.fileName);
      return productEntities.map(
        (v) => new ProductDomain(v.id, v.title, v.description, v.sellerId, v.buyerId, v.isSelling),
      );
    } else if (!isSelling) {
      return [];
    }
    return [];
  }

  deleteProduct(
    productId: string,
    sellerId: string,
    buyerId: string,
    isSelling: boolean,
  ): Promise<IProductDomain | undefined> {
    throw new Error('Method not implemented.');
  }
}
